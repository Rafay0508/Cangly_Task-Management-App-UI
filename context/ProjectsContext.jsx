import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({children}) => {
  const [projects, setProjects] = useState([]);
  const {userDetails} = useAuth();
  const [tasksForUser, setTasksForUser] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!userDetails || !userDetails.uid) {
          setError('User not logged in');
          return;
        }

        const projectsRef = database().ref('projects');

        const snapshot = await projectsRef.once('value');

        if (snapshot.exists()) {
          const projectsList = [];
          snapshot.forEach(childSnapshot => {
            const project = childSnapshot.val();
            const isUserMember = project.teamMembers.some(
              member => member.uid === userDetails.uid,
            );
            if (isUserMember) {
              projectsList.push(project);
            }
          });
          setProjects(projectsList);
        } else {
          setError('No projects found');
        }
      } catch (error) {
        setError('Error fetching projects');
        console.error('Error getting projects: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    const fetchTasks = async () => {
      try {
        const projectsRef = database().ref('projects');
        const snapshot = await projectsRef.once('value');
        const userTasks = [];
        if (snapshot.exists()) {
          snapshot.forEach(projectSnapshot => {
            const project = projectSnapshot.val();

            const isUserMember = project.teamMembers.some(
              member => member.uid === userDetails.uid,
            );

            if (isUserMember) {
              project.tasks.forEach(task => {
                if (task.assignees.includes(userDetails.uid)) {
                  userTasks.push({
                    ...task,
                    projectName: project.projectName,
                  });
                }
              });
            }
          });
          setTasksForUser(userTasks);
        } else {
          setError('No projects found');
        }
      } catch (error) {}
    };
    fetchTasks();
  }, [userDetails]);

  return (
    <ProjectsContext.Provider value={{projects, tasksForUser}}>
      {children}
    </ProjectsContext.Provider>
  );
};

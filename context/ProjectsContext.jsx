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
  const [tasksByProject, setTasksByProject] = useState([]);

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

            const isUserMember = project.teamMembers.includes(userDetails.uid); // Compare directly with the user ID
            if (isUserMember) {
              projectsList.push(project);
            }
          });

          setProjects(projectsList);
        } else {
          setError('No projects found');
        }
      } catch (error) {}
    };
    fetchProjects();
  }, [userDetails]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const projectsRef = database().ref('projects');

        const snapshot = await projectsRef.once('value');

        const userTasks = [];
        if (snapshot.exists()) {
          snapshot.forEach(projectSnapshot => {
            const project = projectSnapshot.val();

            const isUserMember = project.teamMembers.some(member => {
              return member === userDetails.uid;
            });

            if (isUserMember) {
              project.tasks.forEach(task => {
                if (
                  task.assignees.some(
                    assignee => assignee.uid === userDetails.uid,
                  )
                ) {
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

  useEffect(() => {
    const fetchTasksByProject = async () => {
      try {
        const projectsRef = database().ref('projects');
        const snapshot = await projectsRef.once('value');

        const tasksByProject = {};

        if (snapshot.exists()) {
          snapshot.forEach(projectSnapshot => {
            const project = projectSnapshot.val();
            const projectName = project.projectName;

            // Initialize the project name key if not already present
            if (!tasksByProject[projectName]) {
              tasksByProject[projectName] = [];
            }

            // Add tasks assigned to the current user
            project.tasks.forEach(task => {
              tasksByProject[projectName].push(task);
            });
          });

          setTasksByProject(tasksByProject);
        } else {
          setError('No projects found');
        }
      } catch (error) {
        setError('Error fetching tasks by project');
        console.error('Error fetching tasks by project: ', error);
      }
    };
    fetchTasksByProject();
  }, [userDetails]);

  return (
    <ProjectsContext.Provider value={{projects, tasksForUser, tasksByProject}}>
      {children}
    </ProjectsContext.Provider>
  );
};

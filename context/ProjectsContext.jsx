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
        // Ensure the user is available
        if (!userDetails || !userDetails.uid) {
          setError('User not logged in');
          return;
        }

        // Query projects where the user is part of the team (using the uid)
        const projectsRef = database().ref('projects');

        const snapshot = await projectsRef.once('value'); // Fetch data once

        // Check if data exists in the snapshot
        if (snapshot.exists()) {
          const projectsList = [];
          snapshot.forEach(childSnapshot => {
            const project = childSnapshot.val();
            // Filter projects by checking if current user's UID is in the teamMembers array
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
          // Iterate over each project to check tasks for the given user
          snapshot.forEach(projectSnapshot => {
            const project = projectSnapshot.val();

            // Check if the user is part of the project team
            const isUserMember = project.teamMembers.some(
              member => member.uid === userDetails.uid,
            );

            if (isUserMember) {
              // Iterate through each task of the project
              project.tasks.forEach(task => {
                if (task.assignees.includes(userDetails.uid)) {
                  // Add the task to the list of tasks for the user

                  userTasks.push({
                    ...task,
                    projectName: project.projectName, // Add project name to task for context
                  });
                }
              });
            }
          });
          setTasksForUser(userTasks); // Set tasks for the user in the state
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

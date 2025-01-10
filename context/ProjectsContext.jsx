// import React, {createContext, useContext, useEffect, useState} from 'react';
// import {useAuth} from './AuthContext';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

// const ProjectsContext = createContext();

// export const useProjects = () => useContext(ProjectsContext);

// export const ProjectsProvider = ({children}) => {
//   const [projects, setProjects] = useState([]);
//   const {userDetails} = useAuth();
//   const [tasksForUser, setTasksForUser] = useState([]);
//   const [tasksByProject, setTasksByProject] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         if (!userDetails || !userDetails.uid) {
//           setError('User not logged in');
//           return;
//         }
//         const projectsRef = database().ref('projects');
//         const snapshot = await projectsRef.once('value');
//         if (snapshot.exists()) {
//           const projectsList = [];
//           snapshot.forEach(childSnapshot => {
//             const project = childSnapshot.val();

//             const isUserMember = project.teamMembers.includes(userDetails.uid); // Compare directly with the user ID
//             if (isUserMember) {
//               projectsList.push(project);
//             }
//           });

//           setProjects(projectsList);
//         } else {
//           setError('No projects found');
//         }
//       } catch (error) {}
//     };
//     fetchProjects();
//   }, [userDetails]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const projectsRef = database().ref('projects');

//         const snapshot = await projectsRef.once('value');

//         const userTasks = [];
//         if (snapshot.exists()) {
//           snapshot.forEach(projectSnapshot => {
//             const project = projectSnapshot.val();

//             const isUserMember = project.teamMembers.some(member => {
//               return member === userDetails.uid;
//             });

//             if (isUserMember) {
//               project.tasks.forEach(task => {
//                 if (
//                   task.assignees.some(assignee => assignee === userDetails.uid)
//                 ) {
//                   userTasks.push({
//                     ...task,
//                     projectName: project.projectName,
//                   });
//                 }
//               });
//             }
//           });
//           setTasksForUser(userTasks);
//         } else {
//           setError('No projects found');
//         }
//       } catch (error) {}
//     };

//     fetchTasks();
//   }, [userDetails]);

//   useEffect(() => {
//     const fetchTasksByProject = async () => {
//       try {
//         const projectsRef = database().ref('projects');
//         const snapshot = await projectsRef.once('value');

//         const tasksByProject = {};

//         if (snapshot.exists()) {
//           snapshot.forEach(projectSnapshot => {
//             const project = projectSnapshot.val();
//             const projectName = project.projectName;

//             // Initialize the project name key if not already present
//             if (!tasksByProject[projectName]) {
//               tasksByProject[projectName] = [];
//             }

//             // Add tasks assigned to the current user
//             project.tasks.forEach(task => {
//               tasksByProject[projectName].push(task);
//             });
//           });

//           setTasksByProject(tasksByProject);
//         } else {
//           setError('No projects found');
//         }
//       } catch (error) {
//         setError('Error fetching tasks by project');
//         console.error('Error fetching tasks by project: ', error);
//       }
//     };
//     fetchTasksByProject();
//   }, [userDetails]);

//   const updateProjectStatus = async (projectName, status) => {
//     try {
//       console.log(
//         'Fetching project details for:',
//         projectName,
//         'with status:',
//         status,
//       );

//       const projectRef = database().ref(`/projects/${projectName}`);

//       const snapshot = await projectRef.once('value');

//       if (snapshot.exists()) {
//         const projectDetails = snapshot.val();

//         console.log('Project Details:', projectDetails);

//         await projectRef.update({
//           status: status,
//         });

//         console.log('Project status updated successfully to:', status);

//         // Optionally, update the local state or UI to reflect the change
//         // Example: setProjectDetails({ ...projectDetails, status });
//       } else {
//         console.log('No project found with the given name.');
//       }
//     } catch (error) {
//       console.error('Error updating project status:', error);
//     }
//   };

//   return (
//     <ProjectsContext.Provider
//       value={{projects, tasksForUser, tasksByProject, updateProjectStatus}}>
//       {children}
//     </ProjectsContext.Provider>
//   );
// };

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects with real-time listeners
  useEffect(() => {
    if (!userDetails || !userDetails.uid) {
      setError('User not logged in');
      return;
    }

    const projectsRef = database().ref('projects');

    // Real-time listener for project data
    const onValueChange = projectsRef.on('value', snapshot => {
      try {
        if (snapshot.exists()) {
          const projectsList = [];
          snapshot.forEach(childSnapshot => {
            const project = childSnapshot.val();
            const isUserMember = project.teamMembers.includes(userDetails.uid);

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
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    });

    // Cleanup listener on component unmount
    return () => {
      projectsRef.off('value', onValueChange);
    };
  }, [userDetails]);

  // Real-time listener for tasks assigned to the user
  useEffect(() => {
    if (!userDetails || !userDetails.uid) return;

    const projectsRef = database().ref('projects');

    const onValueChange = projectsRef.on('value', snapshot => {
      const userTasks = [];
      if (snapshot.exists()) {
        snapshot.forEach(projectSnapshot => {
          const project = projectSnapshot.val();
          const isUserMember = project.teamMembers.some(
            member => member === userDetails.uid,
          );

          if (isUserMember) {
            project.tasks.forEach(task => {
              if (
                task.assignees.some(assignee => assignee === userDetails.uid)
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
        setError('No tasks found');
      }
    });

    // Cleanup listener on component unmount
    return () => {
      projectsRef.off('value', onValueChange);
    };
  }, [userDetails]);

  // Real-time listener for tasks grouped by project
  useEffect(() => {
    if (!userDetails || !userDetails.uid) return;

    const projectsRef = database().ref('projects');

    const onValueChange = projectsRef.on('value', snapshot => {
      const tasksByProject = {};
      if (snapshot.exists()) {
        snapshot.forEach(projectSnapshot => {
          const project = projectSnapshot.val();
          const projectName = project.projectName;

          if (!tasksByProject[projectName]) {
            tasksByProject[projectName] = [];
          }

          project.tasks.forEach(task => {
            tasksByProject[projectName].push(task);
          });
        });

        setTasksByProject(tasksByProject);
      } else {
        setError('No tasks found by project');
      }
    });

    return () => {
      projectsRef.off('value', onValueChange);
    };
  }, [userDetails]);

  const getProjectDetail = async projectName => {
    try {
      const snapshot = await database()
        .ref(`projects/${projectName}`)
        .once('value');

      if (snapshot.exists()) {
        const projectData = snapshot.val();
        return projectData;
      } else {
        console.log('No project data available for this projectName');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving project data:', error);
      return null;
    }
  };

  const updateProjectStatus = async (projectName, status) => {
    try {
      const projectRef = database().ref(`/projects/${projectName}`);
      const snapshot = await projectRef.once('value');

      if (snapshot.exists()) {
        const projectDetails = snapshot.val();
        await projectRef.update({
          status: status,
        });

        console.log('Project status updated successfully to:', status);
      } else {
        console.log('No project found with the given name.');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      setError('Error updating project status');
    }
  };
  const updateProjectDueDate = async (projectName, newDate) => {
    try {
      console.log(newDate);
      const projectRef = database().ref(`/projects/${projectName}`);
      const snapshot = await projectRef.once('value');

      if (snapshot.exists()) {
        const projectDetails = snapshot.val();
        await projectRef.update({
          dueDate: newDate,
        });

        console.log('Project status updated successfully to:', newDate);
      } else {
        console.log('No project found with the given name.');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      setError('Error updating project status');
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        tasksForUser,
        tasksByProject,
        updateProjectStatus,
        updateProjectDueDate,
        getProjectDetail,
        error,
        loading,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

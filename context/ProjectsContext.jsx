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
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch projects with real-time listeners
//   useEffect(() => {
//     if (!userDetails || !userDetails.uid) {
//       setError('User not logged in');
//       return;
//     }

//     const projectsRef = database().ref('projects');

//     // Real-time listener for project data
//     const onValueChange = projectsRef.on('value', snapshot => {
//       try {
//         if (snapshot.exists()) {
//           const projectsList = [];
//           snapshot.forEach(childSnapshot => {
//             const project = childSnapshot.val();
//             const isUserMember = project.teamMembers.includes(userDetails.uid);

//             if (isUserMember) {
//               projectsList.push(project);
//             }
//           });

//           setProjects(projectsList);
//         } else {
//           setError('No projects found');
//         }
//       } catch (error) {
//         setError('Error fetching projects');
//         console.error(error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     });

//     // Cleanup listener on component unmount
//     return () => {
//       projectsRef.off('value', onValueChange);
//     };
//   }, [userDetails]);

//   // Real-time listener for tasks assigned to the user
//   useEffect(() => {
//     if (!userDetails || !userDetails.uid) return;

//     const projectsRef = database().ref('projects');

//     const onValueChange = projectsRef.on('value', snapshot => {
//       const userTasks = [];
//       if (snapshot.exists()) {
//         snapshot.forEach(projectSnapshot => {
//           const project = projectSnapshot.val();
//           const isUserMember = project.teamMembers.some(
//             member => member === userDetails.uid,
//           );

//           if (isUserMember) {
//             project.tasks.forEach(task => {
//               if (
//                 task.assignees.some(assignee => assignee === userDetails.uid)
//               ) {
//                 userTasks.push({
//                   ...task,
//                   projectName: project.projectName,
//                 });
//               }
//             });
//           }
//         });
//         setTasksForUser(userTasks);
//       } else {
//         setError('No tasks found');
//       }
//     });

//     // Cleanup listener on component unmount
//     return () => {
//       projectsRef.off('value', onValueChange);
//     };
//   }, [userDetails]);

//   // Real-time listener for tasks grouped by project
//   useEffect(() => {
//     if (!userDetails || !userDetails.uid) return;

//     const projectsRef = database().ref('projects');

//     const onValueChange = projectsRef.on('value', snapshot => {
//       const tasksByProject = {};
//       if (snapshot.exists()) {
//         snapshot.forEach(projectSnapshot => {
//           const project = projectSnapshot.val();
//           const projectName = project.projectName;

//           if (!tasksByProject[projectName]) {
//             tasksByProject[projectName] = [];
//           }

//           project.tasks.forEach(task => {
//             tasksByProject[projectName].push(task);
//           });
//         });

//         setTasksByProject(tasksByProject);
//       } else {
//         setError('No tasks found by project');
//       }
//     });

//     return () => {
//       projectsRef.off('value', onValueChange);
//     };
//   }, [userDetails]);

//   const getProjectDetail = async projectName => {
//     try {
//       const snapshot = await database()
//         .ref(`projects/${projectName}`)
//         .once('value');

//       if (snapshot.exists()) {
//         const projectData = snapshot.val();
//         return projectData;
//       } else {
//         console.log('No project data available for this projectName');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error retrieving project data:', error);
//       return null;
//     }
//   };

//   const updateProjectStatus = async (projectName, status) => {
//     try {
//       const projectRef = database().ref(`/projects/${projectName}`);
//       const snapshot = await projectRef.once('value');

//       if (snapshot.exists()) {
//         const projectDetails = snapshot.val();
//         await projectRef.update({
//           status: status,
//         });

//         console.log('Project status updated successfully to:', status);
//       } else {
//         console.log('No project found with the given name.');
//       }
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       setError('Error updating project status');
//     }
//   };
//   const updateProjectDueDate = async (projectName, newDate) => {
//     try {
//       console.log(newDate);
//       const projectRef = database().ref(`/projects/${projectName}`);
//       const snapshot = await projectRef.once('value');

//       if (snapshot.exists()) {
//         const projectDetails = snapshot.val();
//         await projectRef.update({
//           dueDate: newDate,
//         });

//         console.log('Project status updated successfully to:', newDate);
//       } else {
//         console.log('No project found with the given name.');
//       }
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       setError('Error updating project status');
//     }
//   };
//   const deleteTeamMemberByNameAndId = async (projectName, member) => {
//     try {
//       console.log(projectName, member);
//       const projectRef = database().ref(`/projects/${projectName}`);
//       const snapshot = await projectRef.once('value');

//       if (snapshot.exists()) {
//         const projectDetails = snapshot.val();
//         console.log(projectDetails.teamMembers);
//         const updatedTeamMembers = projectDetails.teamMembers.filter(
//           teamMember => member !== teamMember,
//         );
//         await projectRef.update({
//           teamMembers: updatedTeamMembers,
//         });
//         // console.log('Project status updated successfully to:', newDate);
//       } else {
//         console.log('No project found with the given name.');
//       }
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       setError('Error updating project status');
//     }
//   };
//   const addTeamMemberByNameAndId = async (projectName, member) => {
//     try {
//       console.log('Project Name:', projectName, 'Member to Add:', member);

//       // Reference to the specific project in the database
//       const projectRef = database().ref(`/projects/${projectName}`);
//       const snapshot = await projectRef.once('value');

//       if (snapshot.exists()) {
//         const projectDetails = snapshot.val();
//         console.log('Current Team Members:', projectDetails.teamMembers);

//         // Check if the member already exists to avoid duplicates
//         if (!projectDetails.teamMembers.includes(member)) {
//           // Add the new member to the teamMembers array
//           const updatedTeamMembers = [...projectDetails.teamMembers, member];

//           // Update the project's teamMembers in the database
//           await projectRef.update({
//             teamMembers: updatedTeamMembers,
//           });

//           console.log(
//             'Team member added successfully. Updated Team Members:',
//             updatedTeamMembers,
//           );
//         } else {
//           console.log('Member already exists in the team.');
//         }
//       } else {
//         console.log('No project found with the given name.');
//       }
//     } catch (error) {
//       console.error('Error adding team member:', error);
//       setError('Error updating project status');
//     }
//   };

//   const createProject = (
//     projectName,
//     projectDescription,
//     projectType,
//     projectDueDate,
//     addedMembers,
//     tasks,
//     projectManager,
//     status = 'todo',
//   ) => {
//     try {
//       const projectRef = database().ref('/projects');

//       const newProject = {
//         comments: '0',
//         description: projectDescription,
//         dueDate: projectDueDate,
//         fileAttached: '',
//         progress: '0',
//         projectManager,
//         projectName,
//         projectType,
//         status,
//         tasks: tasks || [],
//         teamMembers: addedMembers || [],
//         visibility: 'private',
//       };

//       projectRef
//         .child(projectName)
//         .set(newProject)
//         .then(() => {
//           console.log('Project created successfully:', newProject);
//         })
//         .catch(error => {
//           console.error('Error creating project:', error);
//         });
//     } catch (error) {
//       console.error('Failed to create project:', error);
//     }
//   };

//   return (
//     <ProjectsContext.Provider
//       value={{
//         projects,
//         tasksForUser,
//         tasksByProject,
//         updateProjectStatus,
//         updateProjectDueDate,
//         getProjectDetail,
//         deleteTeamMemberByNameAndId,
//         addTeamMemberByNameAndId,
//         createProject,
//         error,
//         loading,
//       }}>
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
  const [tasksByProject, setTasksByProject] = useState({});
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
          const isUserMember = project.teamMembers.includes(userDetails.uid);

          if (isUserMember) {
            // Check if tasks exist and is an array
            if (Array.isArray(project.tasks)) {
              project.tasks.forEach(task => {
                if (task.assignees.includes(userDetails.uid)) {
                  userTasks.push({
                    ...task,
                    projectName: project.projectName,
                  });
                }
              });
            }
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

          // Initialize project array if not exists
          if (!tasksByProject[projectName]) {
            tasksByProject[projectName] = [];
          }

          // Check if tasks exist and is an array
          if (Array.isArray(project.tasks)) {
            project.tasks.forEach(task => {
              tasksByProject[projectName].push(task);
            });
          }
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
      const projectRef = database().ref(`/projects/${projectName}`);
      const snapshot = await projectRef.once('value');

      if (snapshot.exists()) {
        await projectRef.update({
          dueDate: newDate,
        });

        console.log('Project due date updated successfully to:', newDate);
      } else {
        console.log('No project found with the given name.');
      }
    } catch (error) {
      console.error('Error updating project due date:', error);
      setError('Error updating project due date');
    }
  };

  const deleteTeamMemberByNameAndId = async (projectName, member) => {
    try {
      const projectRef = database().ref(`/projects/${projectName}`);
      const snapshot = await projectRef.once('value');

      if (snapshot.exists()) {
        const projectDetails = snapshot.val();
        const updatedTeamMembers = projectDetails.teamMembers.filter(
          teamMember => member !== teamMember,
        );
        await projectRef.update({
          teamMembers: updatedTeamMembers,
        });
      } else {
        console.log('No project found with the given name.');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError('Error deleting team member');
    }
  };

  const addTeamMemberByNameAndId = async (projectName, member) => {
    try {
      const projectRef = database().ref(`/projects/${projectName}`);
      const snapshot = await projectRef.once('value');

      if (snapshot.exists()) {
        const projectDetails = snapshot.val();

        // Check if the member already exists to avoid duplicates
        if (!projectDetails.teamMembers.includes(member)) {
          const updatedTeamMembers = [...projectDetails.teamMembers, member];
          await projectRef.update({
            teamMembers: updatedTeamMembers,
          });

          console.log(
            'Team member added successfully. Updated Team Members:',
            updatedTeamMembers,
          );
        } else {
          console.log('Member already exists in the team.');
        }
      } else {
        console.log('No project found with the given name.');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      setError('Error adding team member');
    }
  };

  const createProject = (
    projectName,
    projectDescription,
    projectType,
    projectDueDate,
    addedMembers,
    tasks = [], // Default to an empty array if not provided
    projectManager,
    status = 'todo',
  ) => {
    try {
      const projectRef = database().ref('/projects');

      const newProject = {
        comments: '0',
        description: projectDescription,
        dueDate: projectDueDate,
        fileAttached: '',
        progress: '0',
        projectManager,
        projectName,
        projectType,
        status,
        tasks, // No need to check if tasks is an array, since it defaults to an empty array
        teamMembers: addedMembers || [],
        visibility: 'private',
      };

      projectRef
        .child(projectName)
        .set(newProject)
        .then(() => {
          console.log('Project created successfully:', newProject);
        })
        .catch(error => {
          console.error('Error creating project:', error);
        });
    } catch (error) {
      console.error('Failed to create project:', error);
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
        deleteTeamMemberByNameAndId,
        addTeamMemberByNameAndId,
        createProject,
        error,
        loading,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

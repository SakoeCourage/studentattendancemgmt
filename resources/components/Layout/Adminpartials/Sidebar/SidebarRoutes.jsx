import { Icon } from "@iconify/react";
let sidebarRoutes =
    [
        {
            title: "Dashboard",
            icon: <Icon icon="akar-icons:dashboard" />,
            link: '/admin/dashboard',
        },
        {
            title: "Student Management",
            icon: <Icon fontSize={20} icon="heroicons:user-group" />,
            links: [{
                title: 'All Records',
                link: '/admin/student/all'

            }
            ],
        },
        {
            title: "Lecturers Management",
            icon: <Icon fontSize={15} icon="fa-solid:chalkboard-teacher" />,
            links: [{
                title: 'All Lecturers',
                link: '/admin/lecturer/all'

            },
            {
                title: 'Add a Lecturer',
                link: '/admin/lecturer/new'
            }
            ],
        },
        {
            title: "Programs Management",
            icon: <Icon icon="streamline:programming-browser-remove-app-code-apps-subtract-programming-window-minus" />,
            links: [{
                title: 'Programs List',
                link: '/admin/programs/all'

            },
            {
                title: 'Add a program',
                link: '/admin/programs/new'

            }
            ],
        },
        {
            title: "Course Management",
            icon: <Icon fontSize={20} icon="material-symbols:library-books-outline" />,
            links: [{
                title: 'Course List',
                link: '/admin/courses/all'

            },
            {
                title: 'Add a course',
                link: '/admin/courses/new'

            }
            ],
        },
        {
            title: "Generate Report",
            icon: <Icon icon="carbon:report" />,
            link: '/admin/dashboard',
        },
    ];

export default sidebarRoutes;
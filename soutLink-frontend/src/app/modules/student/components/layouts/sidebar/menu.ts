import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 0,
        label: 'menu',
        isTitle: true,
    },
    {
        id: 1,
        label: 'Dashboards',
        icon: 'monitor-dot',
        subItems: [
            {
                id: 1.1,
                label: 'analytics',
                link: '/dashboards-analytics',
                parentId: 1
            },
            {
                id: 1.2,
                label: 'ecommerce',
                link: '/',
                parentId: 1
            },
            {
                id: 1.3,
                label: 'email',
                link: '/dashboards-email',
                parentId: 1
            },
            {
                id: 1.4,
                label: 'hr',
                link: '/dashboards-hr',
                parentId: 1
            },
            {
                id: 1.5,
                label: 'social',
                link: '/dashboards-social',
                parentId: 1
            },
        ]
    },
    {
        id: 1_1,
        label: 'Landing page',
        icon: 'picture-in-picture-2',
        subItems: [
            {
                id: 1_1.1,
                label: 'one-page',
                link: '/onepage-landing',
                parentId: 1
            },
            {
                id: 1_1.2,
                label: 'product',
                link: '/product-landing',
                parentId: 1
            }
        ]
    },
    {
        id: 2,
        label: 'apps',
        isTitle: true,
    },
    {
        id: 2.1,
        label: 'Chat',
        icon: 'messages-square',
        link: '/apps-chat',
        parentId: 2
    },
    {
        id: 2.2,
        label: 'Email',
        icon: 'mail',
        link: '/apps-mailbox',
        parentId: 2
    },
    {
        id: 2.3,
        label: 'Calendar',
        icon: 'calendar-days',
        parentId: 2,
        subItems: [
            {
                id: 2.4,
                label: 'default',
                link: '/apps-calendar',
                parentId: 2.3
            },
            {
                id: 2.5,
                label: 'month-grid',
                link: '/apps-calendar-month-grid',
                parentId: 2.3
            },
            {
                id: 2.6,
                label: 'multi-month-stack',
                link: '/apps-calendar-multi-month-stack',
                parentId: 2.3
            }
        ]
    },
    {
        id: 2.7,
        label: 'Ecommerce',
        icon: 'shopping-bag',
        parentId: 2,
        subItems: [
            {
                id: 2.8,
                label: 'products',
                parentId: 2.7,
                subItems: [
                    {
                        id: 2.9,
                        label: 'list-view',
                        link: '/product-list',
                        parentId: 2.7
                    },
                    {
                        id: 2.10,
                        label: 'grid-view',
                        link: '/product-grid',
                        parentId: 2.7
                    },
                    {
                        id: 2.11,
                        label: 'Overview',
                        link: '/product-overview',
                        parentId: 2.7
                    },
                    {
                        id: 2.12,
                        label: 'Add New',
                        link: '/product-create',
                        parentId: 2.7
                    },
                ]
            },
            {
                id: 2.13,
                label: 'Shopping-Cart',
                link: '/ecommerce-cart',
                parentId: 2
            },
            {
                id: 2.14,
                label: 'checkout',
                link: '/ecommerce-checkout',
                parentId: 2
            },
            {
                id: 2.15,
                label: 'orders',
                link: '/ecommerce-order',
                parentId: 2
            },
            {
                id: 2.16,
                label: 'Order Overview',
                link: '/ecommerce-order-overview',
                parentId: 2
            },
            {
                id: 2.17,
                label: 'sellers',
                link: '/ecommerce-sellers',
                parentId: 2
            },

        ]
    },
    {
        id: 2.18,
        label: 'Hr management',
        icon: 'circuit-board',
        parentId: 2,
        subItems: [
            {
                id: 2.19,
                label: 'employees-list',
                link: '/hr-employee',
                parentId: 2.18
            },
            {
                id: 2.20,
                label: 'holidays',
                link: '/hr-holidays',
                parentId: 2.18
            },
            {
                id: 2.21,
                label: 'leaves-manage',
                parentId: 2.18,
                subItems: [
                    {
                        id: 2.22,
                        label: 'by-employee',
                        link: '/hr-leave-employee',
                        parentId: 2.21
                    },
                    {
                        id: 2.23,
                        label: 'add-leave-employee',
                        link: '/hr-create-leave-employee',
                        parentId: 2.21
                    },
                    {
                        id: 2.24,
                        label: 'by-hr',
                        link: '/hr-leave',
                        parentId: 2.21
                    },
                    {
                        id: 2.25,
                        label: 'add-leave-hr',
                        link: '/hr-create-leave',
                        parentId: 2.21
                    },
                ]
            },
            {
                id: 2.26,
                label: 'attendance',
                parentId: 2,
                subItems: [
                    {
                        id: 2.27,
                        label: 'attendance-hr',
                        link: '/hr-attendance',
                        parentId: 2.26
                    },
                    {
                        id: 2.28,
                        label: 'main-attendance',
                        link: '/hr-attendance-main',
                        parentId: 2.26
                    },
                ]
            },
            {
                id: 2.29,
                label: 'department',
                link: '/hr-department',
                parentId: 2,
            },
            {
                id: 2.30,
                label: 'sales',
                parentId: 2,
                subItems: [
                    {
                        id: 2.31,
                        label: 'estimates',
                        link: '/hr-sales-estimates',
                        parentId: 2.30
                    },
                    {
                        id: 2.32,
                        label: 'payments',
                        link: '/hr-sales-payments',
                        parentId: 2.30
                    },
                    {
                        id: 2.33,
                        label: 'expenses',
                        link: '/hr-sales-expenses',
                        parentId: 2.30
                    },
                ]
            },
            {
                id: 2.34,
                label: 'payroll',
                parentId: 2,
                subItems: [
                    {
                        id: 2.35,
                        label: 'employee-salary',
                        link: '/hr-payroll-employee-salary',
                        parentId: 2.34
                    },
                    {
                        id: 2.36,
                        label: 'payslip',
                        link: '/hr-payroll-payslip',
                        parentId: 2.34
                    },
                    {
                        id: 2.37,
                        label: 'create-payslip',
                        link: '/hr-payroll-create-payslip',
                        parentId: 2.34
                    },
                ]
            },

        ]
    },
    {
        id: 2.38,
        label: 'Notes',
        icon: 'scroll-text',
        link: '/apps-notes',
        parentId: 2,
    },
    {
        id: 2.39,
        label: 'Social',
        icon: 'radio-tower',
        parentId: 2,
        subItems: [
            {
                id: 2.40,
                label: 'friends',
                link: '/apps-social-friends',
                parentId: 2.39,
            },
            {
                id: 2.41,
                label: 'event',
                link: '/apps-social-event',
                parentId: 2.39,
            },
            {
                id: 2.42,
                label: 'watch-video',
                link: '/apps-social-video',
                parentId: 2.39,
            },
            {
                id: 2.43,
                label: 'marketplace',
                link: '/apps-social-marketplace',
                parentId: 2.39,
            },
        ]
    },
    {
        id: 2.44,
        label: 'Invoices',
        icon: 'file-text',
        parentId: 2,
        subItems: [
            {
                id: 2.45,
                label: 'list-view',
                link: '/apps-invoice-list',
                parentId: 2.44,
            },
            {
                id: 2.46,
                label: 'add-new',
                link: '/apps-invoice-add-new',
                parentId: 2.44,
            },
            {
                id: 2.47,
                label: 'overview',
                link: '/apps-invoice-overview',
                parentId: 2.44,
            },
        ]
    },

]
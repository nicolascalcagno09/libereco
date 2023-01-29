import { RouteInfo } from './sidebar.metadata';

export const ROUTESADMIN: RouteInfo[] = [

    // {
    //     path: '/usuarios', title: 'Usuarios', icon: 'ft-bell', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },

    {
        path: '', title: 'Usuarios', icon: 'ft-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/usuarios-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/usuarios-new', title: 'Nuevo', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Productos', icon: 'ft-tag', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/productos-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/productos-new', title: 'Nueva', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Sabores', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/sabores-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/sabores-new', title: 'Nuevo', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/sabores-categorias', title: 'Categorias', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Presentaciones', icon: 'ft-award', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/presentaciones-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/presentaciones-new', title: 'Nueva', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },

    {
        path: '', title: 'Sucursales', icon: 'ft-map-pin', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/sucursales-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/sucursales-new', title: 'Nueva', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Mensajes Nuevos', icon: 'ft-mail', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/contacto-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Promociones', icon: 'fas fa-clipboard-list', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/promociones-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/promociones-new', title: 'Nueva', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Novedades', icon: 'far fa-newspaper', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/novedades-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/novedades-new', title: 'Nueva', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Artículos Canjeables', icon: 'fas fa-cart-plus', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/articuloscanjeables-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/articuloscanjeables-new', title: 'Nuevo', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'App Libereco', icon: 'fab fa-android', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/usuariosapp-list', title: 'Listar', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];


export const ROUTES: RouteInfo[] = [

    {
        path: '/mis-datos', title: 'Mis Datos', icon: 'ft-bell', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/mis-productos', title: 'Mis Productos', icon: 'ft-bell', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/mis-turnos', title: 'Mis Turnos', icon: 'ft-clock', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/mis-mensajes', title: 'Mensajes Nuevos', icon: 'ft-mail', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },

];

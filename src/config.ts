/**
 * Configuración del Frente Digital.
 *
 * Action Network maneja dos identificadores distintos:
 *  - 870040: ID interno del formulario en la interfaz de Action Network.
 *  - 615a193b-d0c6-4791-9caa-8be711bf2727: UUID del recurso que usa la API v2.
 *
 * El POST de altas se hace contra el helper de submissions del formulario:
 * https://actionnetwork.org/api/v2/forms/[uuid]/submissions
 * No requiere API key: es el mecanismo "blind POST" pensado para formularios
 * propios, y evita exponer credenciales en el navegador.
 */
export const ACTION_NETWORK = {
  formUuid: '615a193b-d0c6-4791-9caa-8be711bf2727',
  formId: '870040',
  submitUrl:
    'https://actionnetwork.org/api/v2/forms/615a193b-d0c6-4791-9caa-8be711bf2727/submissions',
  publicFormUrl: 'https://actionnetwork.org/forms/frente-digital-iu',
} as const;

export const SITE = {
  name: 'Frente Digital',
  organization: 'Izquierda Unida',
  url: 'https://frentedigital.iunida.org',
  description:
    'Únete al Frente Digital de Izquierda Unida: una red para participar en convocatorias, movilizaciones y actividades cerca de ti.',
  whatsapp: 'https://whatsapp.com/channel/0029VaX63TcGZNCoRium7a3X',
  telegram: 'https://t.me/iunida',
  privacy: '/privacidad',
  officialPrivacy:
    'https://izquierdaunida.org/aviso-legal-y-politica-de-privacidad/',
  legalEntity: 'Izquierda Unida Federal',
  legalCif: 'G78269206',
  legalAddress: 'Calle Villablanca, 53, 28032 Madrid',
  legalEmail: 'legal@izquierdaunida.org',
  aepd: 'https://www.aepd.es/',
  actionNetworkPrivacy: 'https://actionnetwork.org/privacy/',
  contactEmail: 'info@izquierdaunida.org',
} as const;

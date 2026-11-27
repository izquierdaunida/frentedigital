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
    'Frente Digital de Izquierda Unida: una red para participar en convocatorias, movilizaciones y actividades cerca de ti.',
  whatsapp: 'https://whatsapp.com/channel/0029VaX63TcGZNCoRium7a3X',
  whatsappShare:
    'https://wa.me/?text=%F0%9F%94%BB%20*Ya%20me%20he%20apuntado%20en%20el%20Frente%20Digital%20de%20Izquierda%20Unida*%0A%0AEn%20*momentos%20dif%C3%ADciles*%2C%20toca%20juntarnos%20frente%20a%20la%20amenaza%20reaccionaria.%20Nos%20va%20a%20encontrar%20m%C3%A1s%20fuertes%20que%20nunca%2C%20*hombro%20con%20hombro*%2C%20defendiendo%20los%20derechos%20que%20hemos%20conquistado.%0A%0ALas%20redes%20sociales%20no%20son%20neutrales.%20Est%C3%A1n%20en%20manos%20de%20oligarcas%20vinculados%20a%20la%20extrema%20derecha%20que%20silencian%20y%20manipulan%20nuestros%20contenidos.%20El%20Frente%20Digital%20es%20una%20*red%20aut%C3%B3noma%20y%20soberana*%20para%20conectarnos%20sin%20depender%20de%20sus%20algoritmos.%0A%0A*Ap%C3%BAntate%20tu%20tambi%C3%A9n%3A%20https%3A%2F%2Ffrentedigital.iunida.org*',
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

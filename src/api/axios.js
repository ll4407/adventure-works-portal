import {
  mockLogin, mockWeeklySales, mockBestWorst, mockLowStock, mockShifts,
  mockProducts, mockProductDetail, mockInventory,
  mockEmployees, mockEmployeeDetail, mockDepartments, mockShiftList,
  mockVendors, mockVendorDetail, mockPurchaseOrders, mockPurchaseOrderDetail,
  mockStoreSales, mockCustomerSales, mockStoreDetail, mockCustomerDetail,
  mockPhoneNumberTypes, mockContactTypes, mockCountryRegions, mockAddressTypes, mockStateProvinces
} from './mockData';

// Mock axios for portfolio demo (original API is no longer available)
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const mockResponses = {
  'POST /Login': () => mockLogin,
  'GET /Dashboard/weekly-sales': () => mockWeeklySales,
  'GET /Dashboard/best-worst': () => mockBestWorst,
  'GET /Dashboard/low-stock': () => mockLowStock,
  'GET /Dashboard/shifts': () => mockShifts,
  'GET /Product': () => mockProducts,
  'GET /Inventory': () => mockInventory,
  'GET /Employee': () => mockEmployees,
  'GET /Department': () => mockDepartments,
  'GET /Shift': () => mockShiftList,
  'GET /Vendor': () => mockVendors,
  'GET /Purchase': () => mockPurchaseOrders,
  'GET /Order/store': () => mockStoreSales,
  'GET /Order/customer': () => mockCustomerSales,
  'GET /PhoneNumberType': () => mockPhoneNumberTypes,
  'GET /ContactType': () => mockContactTypes,
  'GET /CountryRegion': () => mockCountryRegions,
  'GET /AddressType': () => mockAddressTypes,
  'GET /StateProvince': () => mockStateProvinces,
};

const dynamicRoutes = [
  { method: 'GET', pattern: /^\/Product\/(\d+)$/, handler: (match) => mockProductDetail(match[1]) },
  { method: 'GET', pattern: /^\/Employee\/(\d+)$/, handler: (match) => mockEmployeeDetail(match[1]) },
  { method: 'GET', pattern: /^\/Vendor\/(\d+)$/, handler: (match) => mockVendorDetail(match[1]) },
  { method: 'GET', pattern: /^\/Purchase\/(\d+)$/, handler: (match) => mockPurchaseOrderDetail(match[1]) },
  { method: 'GET', pattern: /^\/order\/store\/(\d+)$/i, handler: (match) => mockStoreDetail(match[1]) },
  { method: 'GET', pattern: /^\/Order\/customer\/(\d+)$/, handler: (match) => mockCustomerDetail(match[1]) },
  { method: 'GET', pattern: /^\/StateProvince\/(.+)$/, handler: (match) => mockStateProvinces.filter(s => s.countryRegionCode === match[1]) },
  { method: 'GET', pattern: /^\/ContactType$/, handler: () => mockContactTypes },
  { method: 'GET', pattern: /^\/PhoneNumberType$/, handler: () => mockPhoneNumberTypes },
  { method: 'GET', pattern: /^\/CountryRegion$/, handler: () => mockCountryRegions },
  { method: 'GET', pattern: /^\/AddressType$/, handler: () => mockAddressTypes },
];

function resolveRequest(method, url, data) {
  // Normalize URL to always start with /
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  const key = `${method.toUpperCase()} ${normalizedUrl}`;

  // Check static routes first
  if (mockResponses[key]) {
    return mockResponses[key](data);
  }

  // Check dynamic routes
  for (const route of dynamicRoutes) {
    if (method.toUpperCase() === route.method) {
      const match = normalizedUrl.match(route.pattern);
      if (match) {
        return route.handler(match, data);
      }
    }
  }

  // For PUT requests, just return success
  if (method.toUpperCase() === 'PUT') {
    return { success: true };
  }

  console.warn(`[Mock API] No handler for ${method.toUpperCase()} ${normalizedUrl}`);
  return {};
}

const mockAxios = {
  get: async (url) => {
    await delay();
    return { data: resolveRequest('GET', url), status: 200 };
  },
  post: async (url, data) => {
    await delay();
    return { data: resolveRequest('POST', url, data), status: 200 };
  },
  put: async (url, data) => {
    await delay();
    return { data: resolveRequest('PUT', url, data), status: 200 };
  },
  delete: async (url) => {
    await delay();
    return { data: { success: true }, status: 200 };
  }
};

export default mockAxios;

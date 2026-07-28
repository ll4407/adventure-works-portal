// Mock data for portfolio demo - replaces the dead bootcampcentral API

export const mockLogin = {
  success: true,
  employeeId: 1,
  firstName: "Leuber",
  lastName: "Leuterio",
  email: "leuber.leuterio@company.com",
  token: "mock-jwt-token-12345"
};

export const mockWeeklySales = [
  { salesDate: "2024-11-04", totalSales: 3200, totalProfit: 1280, date: "2024-11-04" },
  { salesDate: "2024-11-05", totalSales: 4100, totalProfit: 1640, date: "2024-11-05" },
  { salesDate: "2024-11-06", totalSales: 2800, totalProfit: 1120, date: "2024-11-06" },
  { salesDate: "2024-11-07", totalSales: 5200, totalProfit: 2080, date: "2024-11-07" },
  { salesDate: "2024-11-08", totalSales: 6100, totalProfit: 2440, date: "2024-11-08" },
  { salesDate: "2024-11-09", totalSales: 7400, totalProfit: 2960, date: "2024-11-09" },
  { salesDate: "2024-11-10", totalSales: 3900, totalProfit: 1560, date: "2024-11-10" },
  { salesDate: "2024-11-11", totalSales: 3800, totalProfit: 1520, date: "2024-11-11" },
  { salesDate: "2024-11-12", totalSales: 4500, totalProfit: 1800, date: "2024-11-12" },
  { salesDate: "2024-11-13", totalSales: 3100, totalProfit: 1240, date: "2024-11-13" },
  { salesDate: "2024-11-14", totalSales: 5800, totalProfit: 2320, date: "2024-11-14" },
  { salesDate: "2024-11-15", totalSales: 6800, totalProfit: 2720, date: "2024-11-15" },
  { salesDate: "2024-11-16", totalSales: 8200, totalProfit: 3280, date: "2024-11-16" },
  { salesDate: "2024-11-17", totalSales: 4200, totalProfit: 1680, date: "2024-11-17" }
];

export const mockBestWorst = [
  { productName: "Mountain Bike Pro", unitsSold: 342, unitsInStock: 45 },
  { productName: "Reflective Vest XL", unitsSold: 12, unitsInStock: 89 }
];

export const mockLowStock = [
  { productId: 1, productName: "Mountain Bike Pro", stockLevel: 3 },
  { productId: 11, productName: "Carbon Fiber Frame", stockLevel: 2 },
  { productId: 12, productName: "Disc Brake Set", stockLevel: 5 },
  { productId: 13, productName: "Titanium Pedals", stockLevel: 1 },
  { productId: 14, productName: "LED Headlight", stockLevel: 4 }
];

export const mockShifts = [
  { firstName: "John", middleName: "A", lastName: "Smith", suffix: null, shift: "Day" },
  { firstName: "Sarah", middleName: "B", lastName: "Johnson", suffix: null, shift: "Day" },
  { firstName: "Michael", middleName: null, lastName: "Williams", suffix: "Jr", shift: "Day" },
  { firstName: "David", middleName: null, lastName: "Davis", suffix: null, shift: "Day" },
  { firstName: "Emily", middleName: "C", lastName: "Brown", suffix: null, shift: "Evening" },
  { firstName: "Robert", middleName: null, lastName: "Taylor", suffix: "III", shift: "Evening" },
  { firstName: "Jessica", middleName: "L", lastName: "Martinez", suffix: null, shift: "Evening" },
  { firstName: "Amanda", middleName: "K", lastName: "Anderson", suffix: null, shift: "Night" },
  { firstName: "Chris", middleName: null, lastName: "Garcia", suffix: null, shift: "Night" }
];

// Product images stored locally in public/products/
const productImages = {
  1: "/products/mountain-bike.jpg",
  2: "/products/road-bike.jpg",
  3: "/products/helmet.jpg",
  4: "/products/water-bottle.jpg",
  5: "/products/bike-lock.jpg",
  6: "/products/vest.jpg",
  7: "/products/wrench.jpg",
  8: "/products/chain-lube.jpg",
  9: "/products/pedal-wrench.jpg",
  10: "/products/tire-patch.jpg",
  11: "/products/carbon-frame.jpg",
  12: "/products/disc-brake.jpg",
};

export const mockProducts = [
  { productId: 1, name: "Mountain Bike Pro", productName: "Mountain Bike Pro", productNumber: "BK-M82S-38", color: "Black", listPrice: 250.00, category: "Bikes", thumbnailPhoto: productImages[1] },
  { productId: 2, name: "Road Bike Elite", productName: "Road Bike Elite", productNumber: "BK-R93R-44", color: "Red", listPrice: 250.00, category: "Bikes", thumbnailPhoto: productImages[2] },
  { productId: 3, name: "Cycling Helmet", productName: "Cycling Helmet", productNumber: "HL-U509-R", color: "Red", listPrice: 50.00, category: "Accessories", thumbnailPhoto: productImages[3] },
  { productId: 4, name: "Water Bottle 24oz", productName: "Water Bottle 24oz", productNumber: "WB-H098", color: "Blue", listPrice: 15.00, category: "Accessories", thumbnailPhoto: productImages[4] },
  { productId: 5, name: "Bike Lock Heavy Duty", productName: "Bike Lock Heavy Duty", productNumber: "LO-C100", color: "Black", listPrice: 50.00, category: "Accessories", thumbnailPhoto: productImages[5] },
  { productId: 6, name: "Reflective Vest XL", productName: "Reflective Vest XL", productNumber: "VE-R100-XL", color: "Yellow", listPrice: 30.00, category: "Clothing", thumbnailPhoto: productImages[6] },
  { productId: 7, name: "Bike Spoke Wrench", productName: "Bike Spoke Wrench", productNumber: "TL-SW01", color: "Silver", listPrice: 15.00, category: "Tools", thumbnailPhoto: productImages[7] },
  { productId: 8, name: "Chain Lubricant 8oz", productName: "Chain Lubricant 8oz", productNumber: "ML-CL08", color: null, listPrice: 8.00, category: "Maintenance", thumbnailPhoto: productImages[8] },
  { productId: 9, name: "Pedal Wrench", productName: "Pedal Wrench", productNumber: "TL-PW01", color: "Silver", listPrice: 15.00, category: "Tools", thumbnailPhoto: productImages[9] },
  { productId: 10, name: "Tire Patch Kit", productName: "Tire Patch Kit", productNumber: "TL-TP01", color: null, listPrice: 5.00, category: "Maintenance", thumbnailPhoto: productImages[10] },
  { productId: 11, name: "Carbon Fiber Frame", productName: "Carbon Fiber Frame", productNumber: "FR-CF98", color: "Matte Black", listPrice: 1200.00, category: "Components", thumbnailPhoto: productImages[11] },
  { productId: 12, name: "Disc Brake Set", productName: "Disc Brake Set", productNumber: "BR-DS01", color: "Silver", listPrice: 85.00, category: "Components", thumbnailPhoto: productImages[12] }
];

export const mockProductDetail = (id) => {
  const p = mockProducts.find(p => p.productId == id) || mockProducts[0];
  return {
    ...p,
    photo: productImages[id] || productImages[1],
    thumbnailPhoto: productImages[id] || productImages[1],
    summary: "High-performance product built for durability and style.",
    manufacturer: "Adventure Works Cycles",
    bikeFrame: "Aluminum alloy 6061, double-butted",
    crankset: "Shimano Deore XT",
    material: "Aluminum",
    wheelDescription: "26-inch alloy double-wall rims with sealed bearings.",
    saddleDescription: "Ergonomic padded saddle with reinforced rails.",
    pedalDescription: "Platform pedals with anti-slip pins.",
    riderExperience: "Suitable for intermediate to advanced riders.",
    warrantyPeriod: "1 Year",
    warrantyDescription: "Covers defects in materials and workmanship.",
    maintenanceDescription: "Lubricate chain every 100 miles. Check brake pads monthly.",
    productModelName: "Adventure Works " + p.name,
    productModelId: p.productId,
    numberOfSteps: 3,
    setupHours: 2.0,
    machineHours: 1.5,
    labourHours: 3.0,
    lotSize: 50
  };
};

export const mockInventory = [
  { productId: 1, productName: "Mountain Bike Pro", productNumber: "BK-M82S-38", locationId: 1, locationName: "Warehouse A", quantity: 45, shelf: "A", bin: 1, safetyStockLevel: 10, reorderPoint: 15 },
  { productId: 2, productName: "Road Bike Elite", productNumber: "BK-R93R-44", locationId: 1, locationName: "Warehouse A", quantity: 32, shelf: "A", bin: 2, safetyStockLevel: 10, reorderPoint: 15 },
  { productId: 3, productName: "Cycling Helmet", productNumber: "HL-U509-R", locationId: 2, locationName: "Warehouse B", quantity: 120, shelf: "B", bin: 5, safetyStockLevel: 20, reorderPoint: 30 },
  { productId: 4, productName: "Water Bottle 24oz", productNumber: "WB-H098", locationId: 2, locationName: "Warehouse B", quantity: 500, shelf: "C", bin: 1, safetyStockLevel: 50, reorderPoint: 100 },
  { productId: 5, productName: "Bike Lock Heavy Duty", productNumber: "LO-C100", locationId: 1, locationName: "Warehouse A", quantity: 78, shelf: "D", bin: 3, safetyStockLevel: 15, reorderPoint: 25 },
  { productId: 11, productName: "Carbon Fiber Frame", productNumber: "FR-CF98", locationId: 1, locationName: "Warehouse A", quantity: 2, shelf: "A", bin: 5, safetyStockLevel: 5, reorderPoint: 8 },
  { productId: 12, productName: "Disc Brake Set", productNumber: "BR-DS01", locationId: 2, locationName: "Warehouse B", quantity: 5, shelf: "B", bin: 2, safetyStockLevel: 10, reorderPoint: 15 }
];

export const mockEmployees = [
  { employeeId: 1, firstName: "John", middleName: "A", lastName: "Smith", suffix: null, jobTitle: "Store Manager", employeeNumber: "EMP001", department: "Management", shift: "Day", hireDate: "2022-03-15T00:00:00", shiftHistory: [{ departmentId: 1, departmentName: "Management", shiftId: 1, shiftName: "Day", startDate: "2022-03-15T00:00:00", endDate: null }] },
  { employeeId: 2, firstName: "Sarah", middleName: "B", lastName: "Johnson", suffix: null, jobTitle: "Sales Lead", employeeNumber: "EMP002", department: "Sales", shift: "Day", hireDate: "2021-06-01T00:00:00", shiftHistory: [{ departmentId: 2, departmentName: "Sales", shiftId: 1, shiftName: "Day", startDate: "2021-06-01T00:00:00", endDate: null }] },
  { employeeId: 3, firstName: "Michael", middleName: null, lastName: "Williams", suffix: "Jr", jobTitle: "Mechanic", employeeNumber: "EMP003", department: "Service", shift: "Day", hireDate: "2023-01-10T00:00:00", shiftHistory: [{ departmentId: 3, departmentName: "Service", shiftId: 1, shiftName: "Day", startDate: "2023-01-10T00:00:00", endDate: null }] },
  { employeeId: 4, firstName: "Emily", middleName: "C", lastName: "Brown", suffix: null, jobTitle: "Cashier", employeeNumber: "EMP004", department: "Sales", shift: "Evening", hireDate: "2023-05-20T00:00:00", shiftHistory: [{ departmentId: 2, departmentName: "Sales", shiftId: 2, shiftName: "Evening", startDate: "2023-05-20T00:00:00", endDate: null }] },
  { employeeId: 5, firstName: "David", middleName: null, lastName: "Davis", suffix: null, jobTitle: "Warehouse Staff", employeeNumber: "EMP005", department: "Warehouse", shift: "Day", hireDate: "2022-08-15T00:00:00", shiftHistory: [{ departmentId: 4, departmentName: "Warehouse", shiftId: 1, shiftName: "Day", startDate: "2022-08-15T00:00:00", endDate: null }] },
  { employeeId: 6, firstName: "Jessica", middleName: "L", lastName: "Martinez", suffix: null, jobTitle: "Buyer", employeeNumber: "EMP006", department: "Purchasing", shift: "Day", hireDate: "2021-11-01T00:00:00", shiftHistory: [{ departmentId: 5, departmentName: "Purchasing", shiftId: 1, shiftName: "Day", startDate: "2021-11-01T00:00:00", endDate: null }] },
  { employeeId: 7, firstName: "Robert", middleName: null, lastName: "Taylor", suffix: "III", jobTitle: "Sales Associate", employeeNumber: "EMP007", department: "Sales", shift: "Evening", hireDate: "2023-09-01T00:00:00", shiftHistory: [{ departmentId: 2, departmentName: "Sales", shiftId: 2, shiftName: "Evening", startDate: "2023-09-01T00:00:00", endDate: null }] },
  { employeeId: 8, firstName: "Amanda", middleName: "K", lastName: "Anderson", suffix: null, jobTitle: "HR Coordinator", employeeNumber: "EMP008", department: "Human Resources", shift: "Day", hireDate: "2022-02-14T00:00:00", shiftHistory: [{ departmentId: 6, departmentName: "Human Resources", shiftId: 1, shiftName: "Day", startDate: "2022-02-14T00:00:00", endDate: null }] }
];

export const mockEmployeeDetail = (id) => {
  const emp = mockEmployees.find(e => e.employeeId == id) || mockEmployees[0];
  return {
    ...emp,
    hireDate: "2022-03-15",
    birthDate: "1990-06-20",
    gender: "M",
    maritalStatus: "S",
  };
};

export const mockDepartments = [
  { departmentId: 1, name: "Management" },
  { departmentId: 2, name: "Sales" },
  { departmentId: 3, name: "Service" },
  { departmentId: 4, name: "Warehouse" },
  { departmentId: 5, name: "Purchasing" },
  { departmentId: 6, name: "Human Resources" }
];

export const mockShiftList = [
  { shiftId: 1, name: "Day", startTime: "07:00:00", endTime: "15:00:00" },
  { shiftId: 2, name: "Evening", startTime: "15:00:00", endTime: "23:00:00" },
  { shiftId: 3, name: "Night", startTime: "23:00:00", endTime: "07:00:00" }
];

export const mockVendors = [
  { businessEntityId: 1, accountNumber: "AUSTRALI0001", vendorName: "Australia Bike Retailer", creditRating: 1, activeFlag: true, contactFirstName: "James", contactLastName: "Wilson", contactPhone: "555-0101", contactEmail: "james@ausbikeretailer.com", addressLine1: "123 Vendor St", addressLine2: null, city: "Portland", stateProvinceName: "Oregon", postalCode: "97201" },
  { businessEntityId: 2, accountNumber: "ALLENSON0001", vendorName: "Allenson Cycles", creditRating: 2, activeFlag: true, contactFirstName: "Maria", contactLastName: "Garcia", contactPhone: "555-0202", contactEmail: "maria@allensoncycles.com", addressLine1: "456 Cycle Ave", addressLine2: "Suite 200", city: "Seattle", stateProvinceName: "Washington", postalCode: "98101" },
  { businessEntityId: 3, accountNumber: "ADVANCED0001", vendorName: "Advanced Bicycles", creditRating: 1, activeFlag: true, contactFirstName: "Tom", contactLastName: "Baker", contactPhone: "555-0303", contactEmail: "tom@advancedbikes.com", addressLine1: "789 Bike Blvd", addressLine2: null, city: "San Francisco", stateProvinceName: "California", postalCode: "94102" },
  { businessEntityId: 4, accountNumber: "TRIKES0001", vendorName: "Trikes Inc", creditRating: 3, activeFlag: true, contactFirstName: "Linda", contactLastName: "Chen", contactPhone: "555-0404", contactEmail: "linda@trikesinc.com", addressLine1: "321 Trike Ln", addressLine2: null, city: "Austin", stateProvinceName: "Texas", postalCode: "73301" },
  { businessEntityId: 5, accountNumber: "MORGAN0001", vendorName: "Morgan Bike Accessories", creditRating: 1, activeFlag: true, contactFirstName: "Kevin", contactLastName: "Morgan", contactPhone: "555-0505", contactEmail: "kevin@morganbikeacc.com", addressLine1: "654 Accessory Dr", addressLine2: "Unit 5", city: "Denver", stateProvinceName: "Colorado", postalCode: "80201" }
];

export const mockVendorDetail = (id) => {
  const vendor = mockVendors.find(v => v.businessEntityId == id) || mockVendors[0];
  return {
    ...vendor,
    contacts: [
      { personId: 101, businessEntityId: id, personalTitle: "Mr.", firstName: vendor.contactFirstName, middleName: "J", lastName: vendor.contactLastName, suffix: null, contactTypeId: 2, contactTypeName: "Sales Agent", phoneNumbers: [{ businessEntityId: 101, phoneNumber: vendor.contactPhone, phoneNumberTypeId: 3, phoneNumberTypeName: "Work" }], emailAddresses: [{ emailAddressId: 1, businessEntityId: 101, emailAddress: vendor.contactEmail }] }
    ],
    addresses: [
      { addressId: 1, addressTypeId: 1, addressTypeName: "Main Office", addressLine1: vendor.addressLine1, addressLine2: vendor.addressLine2, city: vendor.city, stateProvinceId: 1, stateProvinceCode: "WA", stateProvinceName: vendor.stateProvinceName, postalCode: vendor.postalCode, countryRegionCode: "US", countryRegionName: "United States" }
    ]
  };
};

export const mockPurchaseOrders = [
  { purchaseOrderDetailId: 1, productName: "Mountain Bike Pro", vendorName: "Australia Bike Retailer", orderDate: "2024-11-01", shipDate: "2024-11-08", quantity: 20, totalDue: 5952.00 },
  { purchaseOrderDetailId: 2, productName: "Road Bike Elite", vendorName: "Allenson Cycles", orderDate: "2024-11-05", shipDate: "2024-11-12", quantity: 15, totalDue: 13534.00 },
  { purchaseOrderDetailId: 3, productName: "Carbon Fiber Frame", vendorName: "Advanced Bicycles", orderDate: "2024-11-10", shipDate: "2024-11-18", quantity: 30, totalDue: 9630.00 },
  { purchaseOrderDetailId: 4, productName: "Disc Brake Set", vendorName: "Trikes Inc", orderDate: "2024-10-28", shipDate: "2024-11-03", quantity: 50, totalDue: 3546.00 },
  { purchaseOrderDetailId: 5, productName: "Cycling Helmet", vendorName: "Morgan Bike Accessories", orderDate: "2024-11-12", shipDate: "2024-11-19", quantity: 100, totalDue: 4200.00 },
  { purchaseOrderDetailId: 6, productName: "Titanium Pedals", vendorName: "Advanced Bicycles", orderDate: "2024-11-08", shipDate: "2024-11-15", quantity: 40, totalDue: 2800.00 }
];

export const mockPurchaseOrderDetail = (id) => {
  const order = mockPurchaseOrders.find(o => o.purchaseOrderDetailId == id) || mockPurchaseOrders[0];
  return {
    ...order,
    purchaseOrderId: order.purchaseOrderDetailId,
    productId: order.purchaseOrderDetailId,
    productNumber: "BK-M82S-38",
    unitPrice: order.totalDue / order.quantity,
    lineTotal: order.totalDue,
    taxAmt: order.totalDue * 0.08,
    freight: 50.00,
    receivedQty: order.quantity,
    rejectedQty: 0,
    stockedQty: order.quantity,
    shipMethodName: "UPS Ground",
    accountNumber: "VENDOR000" + id,
    vendorId: id,
    creditRating: 1
  };
};

export const mockStoreSales = [
  { id: 1, storeEntityId: 101, storeName: "Cycle World", orderDate: "2024-11-15", contactFirstName: "Tom", contactLastName: "Baker", orderNumber: "SO-001", productName: "Mountain Bike Pro", unitPrice: 250.00, lineTotal: 4520.00 },
  { id: 2, storeEntityId: 102, storeName: "Bike Paradise", orderDate: "2024-11-14", contactFirstName: "Anna", contactLastName: "Reed", orderNumber: "SO-002", productName: "Road Bike Elite", unitPrice: 250.00, lineTotal: 8930.00 },
  { id: 3, storeEntityId: 103, storeName: "Mountain Gear Co", orderDate: "2024-11-13", contactFirstName: "Mike", contactLastName: "Torres", orderNumber: "SO-003", productName: "Cycling Helmet", unitPrice: 50.00, lineTotal: 2150.00 },
  { id: 4, storeEntityId: 104, storeName: "Pedal Power", orderDate: "2024-11-12", contactFirstName: "Sue", contactLastName: "Park", orderNumber: "SO-004", productName: "Disc Brake Set", unitPrice: 85.00, lineTotal: 6780.00 }
];

export const mockCustomerSales = [
  { id: 101, customerId: 201, firstName: "Alice", lastName: "Thompson", orderDate: "2024-11-15", orderNumber: "CO-101", orderQty: 2, shipDate: "2024-11-18", unitPrice: 250.00, lineTotal: 850.00 },
  { id: 102, customerId: 202, firstName: "Bob", lastName: "Carter", orderDate: "2024-11-14", orderNumber: "CO-102", orderQty: 5, shipDate: "2024-11-17", unitPrice: 50.00, lineTotal: 1250.00 },
  { id: 103, customerId: 203, firstName: "Carol", lastName: "White", orderDate: "2024-11-13", orderNumber: "CO-103", orderQty: 1, shipDate: "2024-11-16", unitPrice: 320.00, lineTotal: 320.00 },
  { id: 104, customerId: 204, firstName: "Dan", lastName: "Miller", orderDate: "2024-11-12", orderNumber: "CO-104", orderQty: 3, shipDate: "2024-11-15", unitPrice: 700.00, lineTotal: 2100.00 }
];

export const mockStoreDetail = (id) => ({
  storeEntityId: id,
  storeName: mockStoreSales.find(s => s.id == id)?.storeName || "Store",
  orderDate: mockStoreSales.find(s => s.id == id)?.orderDate || "2024-11-15",
  orderNumber: "SO-00" + id,
  carrierTrackingNumber: "1Z999AA10123456784",
  orderQty: 10,
  productName: "Mountain Bike Pro",
  productId: 1,
  unitPrice: 250.00,
  unitPriceDiscount: 0,
  lineTotal: 2500.00,
  annualSales: 125000.00,
  bankName: "First National Bank",
  squareFeet: 4500,
  specialty: "Mountain Bikes",
  numberEmployees: 8,
  contacts: [
    { businessEntityId: 201, personId: 201, title: "Mr.", firstName: "Tom", middleName: "R", lastName: "Baker", suffix: null, contactType: "Owner", contactTypeId: 1, phoneNumber: "555-0201", phoneNumberType: "Work", emailAddress: "tom@cycleworld.com" }
  ],
  previousOrders: [
    { orderDate: "2024-10-01", totalDue: 3400.00 },
    { orderDate: "2024-09-15", totalDue: 2100.00 },
    { orderDate: "2024-08-20", totalDue: 4800.00 }
  ]
});

export const mockCustomerDetail = (id) => {
  const sale = mockCustomerSales.find(c => c.id == id) || mockCustomerSales[0];
  return {
    firstName: sale.firstName,
    middleName: "M",
    lastName: sale.lastName,
    suffix: null,
    orderDate: sale.orderDate,
    orderNumber: sale.orderNumber,
    carrierTrackingNumber: "1Z999BB20123456789",
    productName: "Cycling Helmet",
    productId: 3,
    unitPrice: sale.unitPrice,
    unitPriceDiscount: 0,
    lineTotal: sale.lineTotal,
    orderQty: sale.orderQty,
    taxAmt: sale.lineTotal * 0.08,
    freight: 15.00,
    shipDate: sale.shipDate,
    shipMethodName: "FedEx Express",
    freightNumber: "FX-" + id,
    phoneNumberType: "Cell",
    phoneNumber: "555-01" + id,
    emailAddress: `${sale.firstName.toLowerCase()}.${sale.lastName.toLowerCase()}@email.com`
  };
};

export const mockPhoneNumberTypes = [
  { phoneNumberTypeId: 1, name: "Cell", phoneNumberTypeName: "Cell" },
  { phoneNumberTypeId: 2, name: "Home", phoneNumberTypeName: "Home" },
  { phoneNumberTypeId: 3, name: "Work", phoneNumberTypeName: "Work" }
];

export const mockContactTypes = [
  { contactTypeId: 1, name: "Owner", contactTypeName: "Owner" },
  { contactTypeId: 2, name: "Sales Agent", contactTypeName: "Sales Agent" },
  { contactTypeId: 3, name: "Purchasing Manager", contactTypeName: "Purchasing Manager" }
];

export const mockCountryRegions = [
  { countryRegionCode: "US", name: "United States", countryRegionName: "United States" },
  { countryRegionCode: "CA", name: "Canada", countryRegionName: "Canada" },
  { countryRegionCode: "GB", name: "United Kingdom", countryRegionName: "United Kingdom" },
  { countryRegionCode: "AU", name: "Australia", countryRegionName: "Australia" }
];

export const mockAddressTypes = [
  { addressTypeId: 1, name: "Main Office", addressTypeName: "Main Office" },
  { addressTypeId: 2, name: "Shipping", addressTypeName: "Shipping" },
  { addressTypeId: 3, name: "Billing", addressTypeName: "Billing" }
];

export const mockStateProvinces = [
  { stateProvinceId: 1, stateProvinceCode: "WA", name: "Washington", stateProvinceName: "Washington", countryRegionCode: "US" },
  { stateProvinceId: 2, stateProvinceCode: "OR", name: "Oregon", stateProvinceName: "Oregon", countryRegionCode: "US" },
  { stateProvinceId: 3, stateProvinceCode: "CA", name: "California", stateProvinceName: "California", countryRegionCode: "US" },
  { stateProvinceId: 4, stateProvinceCode: "NY", name: "New York", stateProvinceName: "New York", countryRegionCode: "US" },
  { stateProvinceId: 5, stateProvinceCode: "TX", name: "Texas", stateProvinceName: "Texas", countryRegionCode: "US" },
  { stateProvinceId: 6, stateProvinceCode: "ON", name: "Ontario", stateProvinceName: "Ontario", countryRegionCode: "CA" },
  { stateProvinceId: 7, stateProvinceCode: "BC", name: "British Columbia", stateProvinceName: "British Columbia", countryRegionCode: "CA" }
];

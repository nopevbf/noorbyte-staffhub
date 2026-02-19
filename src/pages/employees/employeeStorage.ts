export type EmployeeStatus = "Active" | "On Leave" | "Probation";

export type Employee = {
  id: string;
  name: string;
  department: string;
  position: string;
  status: EmployeeStatus;
};

export const defaultEmployees: Employee[] = [
  {
    id: "E001",
    name: "Ahmad Fauzi",
    department: "Engineering",
    position: "Sr. Developer",
    status: "Active",
  },
  {
    id: "E002",
    name: "Siti Nurbaya",
    department: "HR",
    position: "HR Manager",
    status: "Active",
  },
  {
    id: "E003",
    name: "Budi Santoso",
    department: "Finance",
    position: "Accountant",
    status: "Active",
  },
  {
    id: "E004",
    name: "Dewi Lestari",
    department: "Marketing",
    position: "Content Lead",
    status: "On Leave",
  },
  {
    id: "E005",
    name: "Rizki Pratama",
    department: "Engineering",
    position: "Jr. Developer",
    status: "Active",
  },
];

const EMPLOYEES_STORAGE_KEY = "staffhub.employees";

export function getNextEmployeeId(list: Employee[]) {
  const highest = list.reduce((max, employee) => {
    const number = Number(employee.id.replace("E", ""));
    return Number.isNaN(number) ? max : Math.max(max, number);
  }, 0);

  return `E${String(highest + 1).padStart(3, "0")}`;
}

function readStoredEmployees(): Employee[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (item): item is Employee =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.department === "string" &&
        typeof item.position === "string" &&
        (item.status === "Active" ||
          item.status === "On Leave" ||
          item.status === "Probation"),
    );
  } catch {
    return [];
  }
}

export function getStoredEmployees(
  fallbackEmployees: Employee[] = defaultEmployees,
) {
  const storedEmployees = readStoredEmployees();
  if (storedEmployees.length > 0) {
    return storedEmployees;
  }

  return fallbackEmployees;
}

export function saveStoredEmployees(employees: Employee[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      EMPLOYEES_STORAGE_KEY,
      JSON.stringify(employees),
    );
  } catch {
    // noop
  }
}

export function addStoredEmployee(
  employee: Employee,
  fallbackEmployees: Employee[] = defaultEmployees,
) {
  const currentEmployees = getStoredEmployees(fallbackEmployees);
  const updatedEmployees = [
    employee,
    ...currentEmployees.filter((item) => item.id !== employee.id),
  ];

  saveStoredEmployees(updatedEmployees);
  return updatedEmployees;
}

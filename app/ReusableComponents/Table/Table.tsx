/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Column {
  key: string;
  title: string;
  render?: (row: any, rowIndex: number) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns = [], data = [] }) => {
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "approved":
        return "text-green-600 font-semibold";
      case "graduated":
      case "ended":
        return "text-yellow-500 font-semibold";
      case "suspended":
      case "declined":
        return "text-red-500 font-semibold";
      case "pending":
        return "text-blue-500 font-semibold";
      default:
        return "text-gray-500 font-medium";
    }
  };

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path
      .split(".")
      .reduce((value, key) => (value ? value[key] : undefined), obj);
  };

  const formatValue = (key: string, value: any): React.ReactNode => {
    if (!value) return "—";

    if (key === "createdAt" || key.toLowerCase().includes("date")) {
      return new Date(value).toLocaleDateString();
    }

    if (key === "status") {
      return <span className={getStatusClass(value)}>{value}</span>;
    }

    if (typeof value === "number" && key.toLowerCase().includes("amount")) {
      return `$${value.toLocaleString()}`;
    }

    return value;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
      {columns.length === 0 || data.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No records found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-sm">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition">
                {columns.map((col) => {
                  const value = getNestedValue(row, col.key);
                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 whitespace-nowrap ${
                        col.key === "status" ? getStatusClass(value) : ""
                      }`}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : formatValue(col.key, value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;

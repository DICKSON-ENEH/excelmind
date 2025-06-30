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
  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path
      .split(".")
      .reduce((value, key) => (value ? value[key] : undefined), obj);
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return "—";

    const statusStyles = {
      available: "bg-green-100 text-green-800 border-green-200",
      enrolled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-purple-100 text-purple-800 border-purple-200",
      dropped: "bg-red-100 text-red-800 border-red-200",
    };

    const style =
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-600 border-gray-200";

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${style}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatValue = (key: string, value: any): React.ReactNode => {
    if (value === null || value === undefined || value === "") return "—";

    if (key === "createdAt" || key.toLowerCase().includes("date")) {
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    }

    if (key === "status") {
      return getStatusBadge(value);
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
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
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

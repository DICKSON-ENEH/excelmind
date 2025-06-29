import React from "react";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  CheckCircle,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  const dashboardCards = [
    {
      title: "Total Courses",
      value: "24",
      icon: BookOpen,
      description: "Available courses",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-800",
    },
    {
      title: "Enrolled Courses",
      value: "8",
      icon: CheckCircle,
      description: "Currently enrolled",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      textColor: "text-purple-700",
    },
    {
      title: "Completed Courses",
      value: "12",
      icon: Award,
      description: "Successfully completed",
      bgColor: "bg-purple-200",
      iconColor: "text-purple-700",
      textColor: "text-purple-900",
    },
    {
      title: "Study Hours",
      value: "156",
      icon: Clock,
      description: "Total hours this month",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-800",
    },
    {
      title: "Assignments Due",
      value: "5",
      icon: Calendar,
      description: "This week",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      textColor: "text-purple-700",
    },
    {
      title: "Class Average",
      value: "87%",
      icon: Users,
      description: "Current semester",
      bgColor: "bg-purple-200",
      iconColor: "text-purple-700",
      textColor: "text-purple-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here&lsquo;s your academic overview.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`${card.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-purple-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                    <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${card.textColor}`}>
                      {card.value}
                    </p>
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${card.textColor} mb-1`}
                  >
                    {card.title}
                  </h3>
                  <p className={`text-sm ${card.textColor} opacity-80`}>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

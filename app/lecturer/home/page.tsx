import React from "react";
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Award,
} from "lucide-react";

const Overview = () => {
  const overviewCards = [
    {
      title: "My Courses",
      value: "6",
      icon: BookOpen,
      description: "Active courses this semester",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-800",
    },
    {
      title: "Total Students",
      value: "245",
      icon: Users,
      description: "Across all courses",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
    },
    {
      title: "Pending Assignments",
      value: "18",
      icon: FileText,
      description: "Need to be graded",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-800",
    },
    {
      title: "Classes This Week",
      value: "12",
      icon: Calendar,
      description: "Scheduled lectures",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-800",
    },
    {
      title: "Teaching Hours",
      value: "28",
      icon: Clock,
      description: "This week",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      textColor: "text-indigo-800",
    },
    {
      title: "Course Completion",
      value: "73%",
      icon: TrendingUp,
      description: "Average across courses",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      textColor: "text-teal-800",
    },
  ];

  const recentActivities = [
    {
      type: "assignment",
      title: "New assignment submitted",
      course: "CSC301 - Data Structures",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      type: "message",
      title: "Message from student",
      course: "MTH211 - Linear Algebra",
      time: "4 hours ago",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      type: "grade",
      title: "Grading completed",
      course: "CSC302 - Operating Systems",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      type: "alert",
      title: "Assignment deadline approaching",
      course: "ENG101 - Technical Writing",
      time: "2 days ago",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ];

  const upcomingClasses = [
    {
      course: "CSC301",
      title: "Data Structures",
      time: "9:00 AM - 11:00 AM",
      room: "Room 101",
      students: 45,
    },
    {
      course: "MTH211",
      title: "Linear Algebra",
      time: "2:00 PM - 4:00 PM",
      room: "Room 205",
      students: 38,
    },
    {
      course: "CSC302",
      title: "Operating Systems",
      time: "4:30 PM - 6:30 PM",
      room: "Lab 3",
      students: 42,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lecturer Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, Prof. Johnson! Here&lsquo;s your teaching overview.
          </p>
        </div>

        {/* Overview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {overviewCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`${card.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200`}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Today&lsquo;s Schedule
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((class_item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {class_item.course}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {class_item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{class_item.time}</p>
                      <p className="text-sm text-gray-500">{class_item.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {class_item.students}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                View Full Schedule
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activities
              </h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {activity.course}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-purple-600 hover:text-purple-700 font-medium text-sm">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Create Assignment</span>
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Grade Submissions</span>
            </button>
            <button className="bg-green-100 hover:bg-green-200 text-green-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Send Message</span>
            </button>
            <button className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Award className="w-5 h-5" />
              <span>View Reports</span>
            </button>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            This Semester Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">245</div>
              <div className="text-sm text-gray-600">Total Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Assignments Graded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">87%</div>
              <div className="text-sm text-gray-600">Average Class Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">142</div>
              <div className="text-sm text-gray-600">Teaching Hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

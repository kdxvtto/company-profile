import { Users, Briefcase, Newspaper, UserCog, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Team',
            value: '12',
            change: '+2',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Services',
            value: '8',
            change: '+1',
            trend: 'up',
            icon: Briefcase,
            color: 'bg-emerald-500',
        },
        {
            title: 'Total News',
            value: '24',
            change: '+5',
            trend: 'up',
            icon: Newspaper,
            color: 'bg-purple-500',
        },
        {
            title: 'Total Users',
            value: '3',
            change: '0',
            trend: 'neutral',
            icon: UserCog,
            color: 'bg-orange-500',
        },
    ];

    const recentActivities = [
        { action: 'Added new team member', user: 'Admin', time: '2 hours ago' },
        { action: 'Updated service "Kredit Umum"', user: 'Admin', time: '3 hours ago' },
        { action: 'Published new article', user: 'Admin', time: '5 hours ago' },
        { action: 'Deleted old news', user: 'Admin', time: '1 day ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Selamat datang di Admin Panel Bank Wonogiri</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="relative overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        <div className="flex items-center mt-2">
                                            {stat.trend === 'up' ? (
                                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                                            ) : stat.trend === 'down' ? (
                                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                                            ) : null}
                                            <span className={`text-sm ${
                                                stat.trend === 'up' ? 'text-green-500' : 
                                                stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                                            }`}>
                                                {stat.change} this month
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activities & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Recent Activities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-500">by {activity.user}</p>
                                    </div>
                                    <span className="text-sm text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-blue-900">Website Status</p>
                                    <p className="text-sm text-blue-600">Running smoothly</p>
                                </div>
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Last Login</p>
                                    <p className="text-sm text-gray-600">Today, 10:30 AM</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">System Version</p>
                                    <p className="text-sm text-gray-600">v1.0.0</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

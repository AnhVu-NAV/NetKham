import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    recentOrders: [] as any[]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/users')
        ]);

        if (ordersRes.ok && usersRes.ok) {
          const orders = await ordersRes.json();
          const users = await usersRes.json();

          const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);

          setStats({
            revenue: totalRevenue,
            orders: orders.length,
            users: users.length,
            recentOrders: orders.slice(0, 4)
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { name: 'Tổng doanh thu', value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.revenue), icon: DollarSign, change: '+12.5%', positive: true },
    { name: 'Đơn hàng mới', value: stats.orders.toString(), icon: ShoppingBag, change: '+5.2%', positive: true },
    { name: 'Khách hàng', value: stats.users.toString(), icon: Users, change: '+18.1%', positive: true },
    { name: 'Tỷ lệ chuyển đổi', value: '3.2%', icon: TrendingUp, change: '-1.1%', positive: false },
  ];

  if (isLoading) {
    return <div className="p-8 text-center text-ivory/60">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-darker p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-ivory/60 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-serif text-ivory">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-darker rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-serif text-ivory mb-6">Biểu đồ doanh thu</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {/* Mock Chart */}
            {[40, 70, 45, 90, 65, 85, 120].map((height, i) => (
              <div key={i} className="w-full bg-dark rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-gold/80 rounded-t-sm transition-all duration-500 group-hover:bg-gold"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-ivory/40 text-sm">
            <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
          </div>
        </div>

        <div className="bg-darker rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-serif text-ivory mb-6">Đơn hàng gần đây</h3>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-dark border border-white/5">
                <div>
                  <p className="text-ivory text-sm font-medium">{order.id}</p>
                  <p className="text-ivory/60 text-xs">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold text-sm font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</p>
                  <p className={`text-xs ${order.status === 'Hoàn thành' ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <div className="text-center text-ivory/40 py-4">Chưa có đơn hàng nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

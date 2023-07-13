import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import HeroSection from '@/components/HeroSection/HeroSection';
import { fetchOrder } from '@/libs/apis';
import { authOptions } from '@/libs/auth';

const Orders = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/');
	}

	const email = session?.user?.email as string;
	const orderData: any = await fetchOrder(email);

	return (
		<div>
			<HeroSection />

			<div className='relative overflow-x-auto px-6 sm:px-12 md:px-20 lg:px-36 pb-40'>
				<table className='w-full text sm text-left text-gray-400'>
					<thead className='text-xs uppercase bg-gray-700 text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Product(s) name
							</th>
							<th scope='col' className='px-6 py-3'>
								Unit Price
							</th>
							<th scope='col' className='px-6 py-3'>
								Order Status
							</th>
							<th scope='col' className='px-6 py-3'>
								Total Price
							</th>
						</tr>
					</thead>
					<tbody>
						{orderData.map((order: any) => {
							const totalPrice = order.items.reduce((acc: any, item: any) => {
								const itemPrice = item.quantity * item.game.price;
								return acc + itemPrice;
							}, 0);

							return (
								<tr
									key={order._id}
									className='border-b bg-gray-800 border-gray-700'
								>
									<th
										scope='row'
										className='px-6 py-4 font-medium whitespace-nowrap text-white'
									>
										{order.items.map((item: any) => (
											<span key={item._id}>
												{item.game.name} ({item.quantity}) <br />
											</span>
										))}
									</th>
									<td className='px-6 py-4'>
										{order.items.map((item: any) => (
											<span key={item._id}>
												{item.game.price} <br />
											</span>
										))}
									</td>
									<td className='px-6 py-4'>{order.orderStatus}</td>
									<td className='px-6 py-4'>$ {totalPrice}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Orders;

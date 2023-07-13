'use client';

import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';

import headerClassNames from './headerClassNames';
import { useAppDispatch } from '@/hooks/storeHook';
import { toggleCart } from '@/redux/features/cartSlice';
import useCartTotals from '@/hooks/useCartTotals';
import Signup from '../Signup/Signup';

const Header = () => {
	const {
		header,
		container,
		li,
		logoContainer,
		link,
		logo,
		nav,
		ul,
		orders,
		contactUs,
		signupBtn,
		signinBtn,
		logoutBtn,
		cart,
	} = headerClassNames;

	const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			// handle user not authenticated
		},
	});

	const { totalQuantity } = useCartTotals();

	const dispatch = useAppDispatch();

	const toggleForm = () => {
		setIsSignupFormOpen(!isSignupFormOpen);
	};

	const signinHandler = async () => {
		try {
			await signIn();
		} catch (error) {
			console.log('SIGN IN ERROR', error);
		}
	};

	return (
		<>
			<Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
			<header className={header}>
				<div className={container}>
					<Link href='/' className={logoContainer}>
						<h1 className={logo}>Logo</h1>
					</Link>

					<nav className={nav}>
						<ul className={ul}>
							<li>
								<button onClick={() => dispatch(toggleCart())} className={link}>
									<span>
										Cart
										<AiOutlineShoppingCart className='inline-block text-3xl' />
									</span>
									<div className={cart}>{totalQuantity}</div>
								</button>
							</li>

							<li className='flex items-center justify-center h-7'>
								{session?.user && (
									<>
										<Link href='/orders' className={orders}>
											Orders
										</Link>
										<button onClick={() => signOut()} className={logoutBtn}>
											Logout
										</button>
									</>
								)}
								{!session?.user && (
									<>
										<button onClick={toggleForm} className={signupBtn}>
											Sign Up
										</button>
										<button onClick={signinHandler} className={signinBtn}>
											Sign In
											<FcGoogle
												style={{
													fontSize: '25px',
													cursor: 'pointer',
													marginLeft: '12px',
												}}
												className={link}
											/>
										</button>
									</>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;

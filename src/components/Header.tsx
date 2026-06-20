import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import classnames from "classnames";
import { Fragment, useState } from "react";
import Logo from "../assets/icons/California-Approves-Logo-RGB-OL.svg?react";
import { NavButton } from "./common/buttons";
import { Link } from "./common/links";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function Header() {
	const [burgerOpen, setBurgerOpen] = useState(false);
	return (
		<Popover className="bg-white lg:sticky top-0 z-30">
			<div className="flex items-center justify-between border-b border-purple py-6 lg:justify-start lg:space-x-10">
				<div className="flex justify-start items-center lg:flex-auto">
					<Link to="/" className="m-4">
						<span className="sr-only">CA Approves</span>
						<Logo className="w-56" />
					</Link>
					<Link
						to="/approval-101"
						color="green"
						className="ml-7 hidden lg:block"
					>
						<h5>APPROVAL&nbsp;VOTING</h5>
					</Link>
					<Link to="/faq" color="green" className="ml-7 hidden lg:block">
						<h5>FAQ</h5>
					</Link>
					{/* <Link to='/articles' color="green" className='ml-7 hidden lg:block'><h5>ARTICLES</h5></Link> */}
				</div>
				<div className="hidden items-center justify-end lg:flex lg:flex-auto ">
					<NavButton variant="solid" color="orange" link="/contact">
						Join Us
					</NavButton>
					<NavButton
						variant="solid"
						color="purple"
						link="/donate"
						className="ml-4"
					>
						Donate
					</NavButton>
				</div>
				<Popover.Group as="nav" className="space-x-10 flex mx-4">
					<Popover className="">
						{({ open }) => (
							<>
								<Popover.Button
									className={classNames(
										open ? "text-gray-900" : "text-gray-500",
										"group inline-flex items-center rounded-md bg-white font-medium hover:text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-purple focus:ring-offset-2",
									)}
								>
									<Bars3Icon
										className={classnames(
											"lg:hidden text-purple hover:text-purple-high w-16 m-4",
										)}
										onClick={() => setBurgerOpen(!burgerOpen)}
									/>
								</Popover.Button>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1"
								>
									<Popover.Panel className="absolute left-0 z-10  mt-3 w-full transform px-2 sm:px-0">
										<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/50 text-white">
											<div className="relative w-full grid gap-6 bg-purple px-5 py-6 sm:gap-8 sm:p-8">
												<Link
													to="/approval-101"
													color="white"
													className="mx-4 text-base"
												>
													<h2>Approval Voting</h2>
												</Link>
												<Link
													to="/faq"
													color="white"
													className="mx-4 text-base"
												>
													<h2>FAQ</h2>
												</Link>
												{/* <Link to='/articles' color="white" className='mx-4'><h2>Articles</h2></Link> */}
											</div>

											<div className="bg-purple px-5 py-5 flex flex-row space-y-0 sm:px-8">
												<NavButton
													variant="solid"
													color="orange"
													link="/contact"
												>
													Join Us
												</NavButton>
												<NavButton
													variant="outlined"
													color="orange"
													link="/donate"
													className="ml-4 text-white"
												>
													Donate
												</NavButton>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>
				</Popover.Group>
			</div>
		</Popover>
	);
}

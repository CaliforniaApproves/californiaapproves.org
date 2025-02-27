import { connect } from 'react-redux';
import { toggleErrorToast } from '../../actions/system';
import classnames from 'classnames';

import React, { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ErrorToast = ({ error, index, toggleErrorToast }: any) => (
	<div className={classnames({ 'hidden': !error.show })}>
		{/* Global notification live region, render this permanently at the end of the document */}
		<div
			aria-live="assertive"
			className={"flex items-end px-8 py-6 pointer-events-none sm:p-3 sm:items-start"}
		>
			<div className="w-full flex flex-col items-center space-y-4 sm:items-end">
				{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
				<Transition
					show={error.show}
					as={Fragment}
					enter="transform ease-out duration-300 transition"
					enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
					enterTo="translate-y-0 opacity-100 sm:translate-x-0"
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="max-w-sm w-full bg-surface-medium shadow-lg rounded-lg pointer-events-auto overflow-hidden">
						<div className="p-2.5">
							<div className="flex items-start">
								<div className="mt-1 shrink-0">
									<XMarkIcon className="h-5 w-5 text-error-medium" aria-hidden="true" />
								</div>
								<div className="ml-2.5 w-0 flex-1 pt-0.5 text-schist">
									<span className="text-sm font-medium">{error.title}</span> <br />
									<span className="mt-1 text-sm">{error.message}</span>
								</div>
								<div className="ml-4 shrink-0 flex text-schist">
									<button
										className="rounded-md inline-flex text-schist hover:text-schist-low focus:outline-hidden focus:ring-2 focus:ring-offset-2"
										onClick={() => toggleErrorToast({ index })}
									>
										<span className="sr-only">Close</span>
										<XMarkIcon className="h-4 w-4" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</div>
)

const mapStateToProps = (state: any) => ({ });

const connector = connect(mapStateToProps, {
	toggleErrorToast
});

export default connector(ErrorToast);

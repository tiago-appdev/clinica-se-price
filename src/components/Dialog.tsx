import React from "react";

const Dialog = ({ children, open, onOpenChange }) => {
	const handleClose = () => {
		if (onOpenChange) {
			onOpenChange(false);
		}
	};

	return open ? (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={handleClose}
		>
			<div
				className="bg-white rounded-md shadow-lg max-w-lg w-full"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	) : null;
};

const DialogContent = ({ children, className, ...props }) => (
	<div className={`p-4 ${className}`} {...props}>
		{children}
	</div>
);

const DialogHeader = ({ children }) => <div className="p-4">{children}</div>;
const DialogTitle = ({ children }) => (
	<h2 className="text-lg font-semibold">{children}</h2>
);
const DialogDescription = ({ children }) => (
	<p className="text-sm text-gray-500">{children}</p>
);
const DialogFooter = ({ children }) => (
	<div className="border-t p-4 flex justify-center space-x-2">{children}</div>
);

export {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
};

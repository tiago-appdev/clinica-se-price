import React, { useState } from "react";
import Button from "../components/Button";
import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardFooter,
} from "../components/Card";

export default function SettlementPage() {
	const initialRows = [
		{ id: 1, doctor: "Dr. Jane Smith", amount: "$5,000.00" },
		{ id: 2, doctor: "Dr. John Doe", amount: "$7,500.00" },
		{ id: 3, doctor: "Dr. Sarah Lee", amount: "$3,200.00" },
		{ id: 4, doctor: "Dr. Michael Johnson", amount: "$9,800.00" },
	];

	const [rows, setRows] = useState(initialRows);

	const handleLiquidar = (id) => {
		setRows(rows.filter(row => row.id !== id));
	};

	const handleLiquidarTodos = () => {
		setRows([]);
	};

	return (
		<div className="flex">
			<div className="flex-1">
				<main className="grid gap-8 p-4 md:p-6">
					<Card>
						<CardHeader>
							<CardTitle>Liquidación de Honorarios</CardTitle>
						</CardHeader>
						<CardContent>
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Doctor
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Cantidad Adeudada
										</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
											Accion
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{rows.map(row => (
										<tr key={row.id}>
											<td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
												{row.doctor}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{row.amount}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<button
													onClick={() => handleLiquidar(row.id)}
													className="text-indigo-600 hover:text-indigo-900 border border-indigo-600 px-3 py-1 rounded"
												>
													Liquidar
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardContent>
						{rows.length > 0 && (
							<CardFooter>
								<Button
									variant="outline"
									className="p-4 text-white bg-gray-900"
									onClick={handleLiquidarTodos}
								>
									Liquidar Todos
								</Button>
							</CardFooter>
						)}
					</Card>
				</main>
			</div>
		</div>
	);
}

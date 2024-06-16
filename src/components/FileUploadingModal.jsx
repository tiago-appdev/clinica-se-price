/* eslint-disable react/prop-types */
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "./Dialog";
import Button from "./Button";
import Label from "./Label";
import Input from "./Input";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function FileUploadingModal({
	isOpen,
	onOpenChange,
	appointmentId,
	patientId,
}) {
	const [file, setFile] = useState(null);
	const [medicalHistory, setMedicalHistory] = useState("");

	const handleClose = () => {
		onOpenChange(false);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (!file || !appointmentId || !patientId) return;

		try {
			const newFileName = `${appointmentId}_${patientId}_${file.name}`;
			const newFile = new File([file], newFileName, { type: file.type });

			const { data: fileData, error: uploadError } =
				await supabase.storage
					.from("seprice-reports")
					.upload(newFile.name, newFile);

			if (uploadError) {
				throw uploadError;
			}

			const { data: publicUrlData } = supabase.storage
				.from("seprice-reports")
				.getPublicUrl(fileData.path);

			if (!publicUrlData || !publicUrlData.publicUrl) {
				throw new Error("Failed to get public URL");
			}

			const publicUrl = publicUrlData.publicUrl;

			const fileResultData = {
				appointment_id: appointmentId,
				patient_id: patientId,
				result_type: fileData.fullPath.split(".").pop(),
				result_text: "",
				result_file_url: publicUrl,
				result_created_at: new Date(),
				result_updated_at: new Date(),
			};

			const textResultData = {
				appointment_id: appointmentId,
				patient_id: patientId,
				result_type: "text",
				result_text: medicalHistory,
				result_file_url: "",
				result_created_at: new Date(),
				result_updated_at: new Date(),
			};

			const { error: fileInsertError } = await supabase
				.from("medical_results")
				.insert(fileResultData);

			if (fileInsertError) {
				throw fileInsertError;
			}

			if (medicalHistory) {
				const { error: textInsertError } = await supabase
					.from("medical_results")
					.insert(textResultData);

				if (textInsertError) {
					throw textInsertError;
				}
			}

			handleClose();
		} catch (error) {
			console.error(
				"Error uploading file and saving to database:",
				error.message
			);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[650px]">
				<DialogHeader>
					<DialogTitle>Sube los resultados</DialogTitle>
					<DialogDescription>
						Sube un archivo de reporte o escribe el historial médico
						del paciente.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="report">Medical Report</Label>
						<Input
							id="report"
							type="file"
							accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.tif,.svg,.webp,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mp3,.wav,.flac,.ogg,.wma,.aac,.m4a,.opus,.zip,.rar,.7z,.tar,.gz,.tgz,.bz2,.xz,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.tif,.svg,.webp,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mp3,.wav,.flac,.ogg,.wma,.aac,.m4a,.opus,.zip,.rar,.7z,.tar,.gz,.tgz,.bz2,.xz"
							onChange={handleFileChange}
						/>
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="medicalHistory">Medical History</Label>
						<textarea
							id="medicalHistory"
							onChange={(e) => setMedicalHistory(e.target.value)}
							placeholder="Escribe el reporte..."
							className="min-h-[200px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-700 focus:outline-none transition-colors resize-none"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="button"
						className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
						onClick={handleUpload}
					>
						Confirmar
					</Button>
					<Button
						type="button"
						className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
						onClick={handleClose}
					>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function generateTimeOptions() {
	const times = [];
	for (let hour = 8; hour < 19; hour++) {
		for (let minutes = 0; minutes < 60; minutes += 30) {
			const time = `${hour.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}`;
			times.push(time);
		}
	}
	return times;
}

export function formatDate(date) {
	const dayOfWeek = date.toLocaleDateString("es-AR", { weekday: "long" });

	const day = String(date.getDate()).padStart(2, "0");

	const month = String(date.getMonth() + 1).padStart(2, "0"); 

	const year = date.getFullYear();

	return `${capitalize(dayOfWeek)} ${day}/${month}/${year}`;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateAge(birthDate) {
	const today = new Date();
	const dob = new Date(birthDate);

	let age = today.getFullYear() - dob.getFullYear();
	const monthDiff = today.getMonth() - dob.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
		age--;
	}

	return age;
}

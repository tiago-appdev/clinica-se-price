// Function to generate time options
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
	// Get the day of the week in Spanish
	const dayOfWeek = date.toLocaleDateString("es-AR", { weekday: "long" });

	// Get the day of the month with leading zero
	const day = String(date.getDate()).padStart(2, "0");

	// Get the month with leading zero
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based

	// Get the full year
	const year = date.getFullYear();

	// Combine parts into desired format
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

	// If the birth month is ahead of the current month, reduce age by 1
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
		age--;
	}

	return age;
}

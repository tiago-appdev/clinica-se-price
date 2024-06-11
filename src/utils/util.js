// Function to generate time options
export function generateTimeOptions() {
  const times = [];
  for (let hour = 8; hour < 19; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      times.push(time);
    }
  }
  return times;
}

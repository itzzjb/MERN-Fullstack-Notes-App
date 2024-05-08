// We are exporting the formatData function so we can use it in other files
// This says this function get dataString as an argument and return a string
// it is not required to specify the return type of the function but it is a good practice to do so
// Because it won't compile if the return type is different from the specified type
export function formatDate(dateString: string): string {
  // Second argument is the javascript object
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

// Now we can use this function in the Note component to format the date

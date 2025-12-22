
function MyLogger() {
    const id = Math.floor(Math.random() * 100);
    return (...messages) => console.log(id, ...messages)
}

export default MyLogger;
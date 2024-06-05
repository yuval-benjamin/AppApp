async function getAll() {
    const res = await fetch('http://localhost:8088/articles')
    console.log(res)
    const json = await res.json()
    console.log(json)

    for (let i = 0; i < json.length; i++) {
        const element = json[i];

        let workout = document.getElementById('workoutTemplate').innerHTML
        for (const key in element) {
            workout = workout.replace('{' + key + '}', element[key])
        }

        document.getElementsByTagName('ul')[0].innerHTML += article
    }
}
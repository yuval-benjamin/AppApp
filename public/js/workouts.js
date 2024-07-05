async function getAll() {
  const res = await fetch('http://localhost/')
  console.log(res)
  const json = await res.json()
  console.log(json)

  for (let i = 0; i < json.length; i++) {
      const element = json[i];

      let workout = document.getElementById('workoutTemplate').innerHTML
      for (const key in element) {
          workout = workout.replace('{' + key + '}', element[key])
      }

      document.getElementsByTagName('ul')[0].innerHTML += workout
  }
}

getAll()

// $(function () {
//   $.ajax({
//       url: "http://localhost/",
//       type:'GET'              
//   }).done(function (data) {
      
//        data.forEach(workout => {
//           $('.row row-cols-1 row-cols-md-5 g-4').append(
//           '<div class="col">' +
//             '<div class="card h-100">' +
//               '<img src="/images/' + workout.image + '" class="card-img-top img-fluid" alt="Skyscrapers" />' + 
//               '<div class="card-body">' +
//                 '<h5 class="card-title">' + workout.name + '</h5>' +
//                 '<p class="card-text">' + workout.description + '</p>' +
//               '</div>' + 
//               '<div class="card-footer">' +
//                 '<small class="text-muted"> <a href="#" class="btn">Buy</a></small>' + 
//               '</div>' + 
//             '</div>' +
//           '</div>');
//         });
//       });
//   });
let planGeometry = {};

      var dd = new DroneDeploy({
        version: 1
      });

      dd.then(function(api){
        let select = document.getElementById('planSelect');
        select.innerHTML = '';
        
        api.Plans.all().then(function(plans){
          for(let plan of plans) {
            let option = document.createElement('option');
            option.innerText = plan.name;
            option.value = plan.id;
            select.appendChild(option);
            planGeometry[plan.id] = {
              location: plan.location,
              geometry: plan.geometry
            }
          }
        });
      });

      function drawOutline(){
        let planId = document.getElementById('planSelect').value;
        
        var latInput =  parseInt(document.getElementById("latInput").value);
        var lngInput = parseInt(document.getElementById("lngInput").value);

        dd.then(function(api){

          api.Plans.getCurrentlyViewed().then(function(plan){
            api.Annotations.createMarker(
              plan.id,
              {lat: latInput, lng: lngInput},
              {description: 'Test', color: '#888888'}
            );
          });
        });
      };

      function clearAnnotations(){
        dd.then(function(api){
          api.Plans.getCurrentlyViewed().then(function(plan){
            api.Annotations.get(plan.id).then(function(annotations){
              annotations.forEach(function(ann){
                console.log(ann)
                api.Annotations.delete(ann.id);
              })
            });
          });
        })
      }
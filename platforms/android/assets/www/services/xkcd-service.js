var xkcdService = app.service('XKCDService', ['$q', 'PhoneService', function($q, PhoneService) {
	var comics = JSON.parse(localStorage.getItem('xkcdComics')) || {}; // get whatever data we have in localStorage, or create a new object if we haven't got anything
	return {
		get: function(comicNumber) {
			var phoneCall;
			var attemptingNewer = false;
			var deferred = $q.defer(); // we want to defer, as the comic being requested might be in memory or in localStorage
			if(!comicNumber){ // if the user is trying to get a comic with number less than 1 or comicNumber was not supplied, we'll request the latest one instead
				if(comics.hasOwnProperty('latest') && (Date.now() - Date.parse(comics.lastUpdate)) < 60*60*12*1000){ // if we have defined a 'latest' comic, and it has been less than 12 hours since it was fetched
					comicNumber = 'latest'; // this will get the latest comic from memory or localStorage
				}
			}
			else if(comics.hasOwnProperty('latest') && comicNumber === (comics.latest.num + 1)){ // if trying to get a comic later than the latest we have
				if(comics[comicNumber] !== false){ // and we haven't tried before
					attemptingNewer = true; // attempt getting the newer
				}
				else{ // if we have tried before, comics[comicNumber] have been set to false
					comicNumber = 1; // so get the first comic instead (i.e. "start over")
				}
			}
			if(comics.hasOwnProperty(comicNumber) && comics[comicNumber] !== false){ // check if the comics-object har key 'comicNumber'
				deferred.resolve(comics[comicNumber]); // if it does, resolve the promise with the comic
			}
			else{ // if it doesn't, request it from xkcd-website
				phoneCall = PhoneService.get(comicNumber);
				phoneCall.success(function(data) { // when the request returns data, we want to do something with it
					if(!comicNumber){ // if this is the case, the returned data is the latest comic
						comics['latest'] = data; // we want to put this at the 'latest'-key as well as the number of comic, so we always know which comic is the latest
						comics['lastUpdate'] = new Date(); // save a date-object so we can compare the time at future requests
						localStorage.setItem('xkcdComics', JSON.stringify(comics)); // persist the data to localStorage
					}
					comics[data.num] = data; // save the comic in memory
					deferred.resolve(data); // resolve the promise with the data received
				});
				phoneCall.error(function(data) { // we got nothing
					if(attemptingNewer){ // we attempted to get newer than the latest we have
						comics[comicNumber] = false; // set to false so we won't try to make another request to get the same error
						if(comics.hasOwnProperty(1) && comics[1] !== false){ // check if the comics-object has key 1
							deferred.resolve(comics[1]); // if it does, resolve the promise with the comic
						}
						else{ // if not, make a call for it. we know this comic exists, so some data will be given back to the controller after this request
							var newPhoneCall = PhoneService.get(1);
							newPhoneCall.success(function(data) {
								comics[data.num] = data; // save the comic in memory
								localStorage.setItem('xkcdComics', JSON.stringify(comics)); // persist the data to localStorage
								deferred.resolve(data); // resolve the promise with the data received
							});
							newPhoneCall.error(function(data) { // comic number 1 doesn't exist, or request failed
								alert('Error!');
								deferred.reject('All hell has broken loose'); // something horrible is going on
							});
						}
					}
					else{
						alert('Error!');
					}
				});
			}
			return deferred.promise; // we return the promise (that we at some moment will give it data)
		}
	};
}]);
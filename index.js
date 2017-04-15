#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-j3rr3n");


 
//1. FIND THE NUMBER OF MALES.

    var malesList = function(array) {
    var malesCount = 0;
    _.each(array, function(item, index, array) {
        if(item.gender==="male") {
        malesCount ++;
        }
    }); return "The number of MALE customers is " + malesCount;
    };
    console.log(malesList(customers));
    

//2. FIND THE NUMBER OF FEMALES.

    var femalesList = function(array) {
    var femalesCount = 0;
        _.each(array, function(item, index, array) {
        if(item.gender==="female") {
        femalesCount ++;
        }
    }); return "The number of FEMALE customers is " + femalesCount;
    };
    console.log(femalesList(customers));
    
//3. FIND THE NAME AND AGE OF THE OLDEST CUSTOMER.

    var oldestCustomer = function(array) {
        var oldieAge = [];
        var OldieArray = [];
        var oldieName = [];
        _.each(array, function(item, index, array) {
            oldieAge.push(item.age);
            OldieArray = Math.max.apply(Math, oldieAge);
        });
        _.each(array, function(item, index, array){
            if(item.age === OldieArray) {
                oldieName = item.name;
            }
        }); return "The NAME and AGE of the OLDEST customer is " + oldieName + ", " + OldieArray;
    }; 
    console.log(oldestCustomer(customers));
    
    
//4. FIND THE NAME AND AGE OF THE YOUNGEST CUSTOMER.

    var youngestCustomer = function(array) {
        var newbieAge = [];
        var NewbieArray = [];
        var newbieName = [];
        _.each(array, function(item, index, array) {
            newbieAge.push(item.age);
            NewbieArray = Math.min.apply(Math, newbieAge);
        });
        _.each(array, function(item, index, array){
            if(item.age === NewbieArray) {
                newbieName.push(item.name);
            }
        }); return "The NAME and AGE of the YOUNGEST customer is " + newbieName.join(', ') + (', ') + NewbieArray;
    }; 
    console.log(youngestCustomer(customers));
    
    
//5. FIND THE AVERAGE BALANCE OF ALL THE CUSTOMERS.

    let averageBalance = function() {
        var sum = 0;
        var aveBal = 0;
      _.reduce(customers, function(combined, item, index, array){
        aveBal = item.balance.replace(/[$,]/g, '');
        aveBal = parseFloat(aveBal);
        sum += aveBal;
    },0);  return sum/customers.length;
    }; 
    console.log(averageBalance());
    

//6. FIND HOW MANY CUSTOMERS' NAMES BEGIN WITH AN ARBITRARY LETTER.

    var beginsWith = function(customers,letter) {
        var namesArr = [];
        var count = 0;
        _.map(customers, function(customer,index,array) {
            namesArr.push(customer.name);
        });
        var found = _.filter(namesArr, function(name,index,array){
            if(letter.toUpperCase() === name.charAt(0).toUpperCase()) {
                count +=1;
                return name;
            } 
        });
    return "There is/are " + count + " Customer names beginning with " + letter + ": " + found.join(', ');
    };
    console.log(beginsWith(customers, 's'));
    
    
//7. FIND HOW MANY CUSTOMERS' FRIENDS' NAMES BEGIN WITH ARBITRARY LETTER.

    var friendsFirstInitial = function(customers, letter) {
        return _.map(customers, function(customer,index) {
            return _.map(customer.friends, function(friend,index){
               if(friend.name[0] === letter.toUpperCase()) return friend.name;
            }); 
        }).length;
    };
console.log(friendsFirstInitial(customers, 'o') + " customers names begin with chosen letter");
   

//8. FIND ALL CUSTOMERS THAT HAVE THIS CUSTOMERS NAME IN THEIR FRIENDSLIST.
  
  var findFriend = function(customerName) {
    return _.reduce(customers, function(friendsList, cust, j) {
        return _.reduce(cust.friends, function(friendsList, friend, i) {
            if(friend.name === customerName) return friendsList = cust.name + " " + friendsList;
            return friendsList;
        }, friendsList);
    }, "");
};
console.log(findFriend('Olga Newton') + "is/are in friendsList");


//9. FIND THE TOP 3 MOST COMMON TAGS USED AMONGST CUSTOMERS.
    
    var top3tags = function(customers, tags) {
    var tagsArr = [];
    _.map(customers, function(customer, index, array) {
        _.each(customer[tags], function(value, index, array) {
            return tagsArr.push(value);
        });
    });
    var freq = {};
    _.each(tagsArr, function(item, index, arrar) {
        if (freq[item] == null) {
            freq[item] = 1;
        }
        else {
            freq[item]++;
        }
    });
    var sortable = [];
    for (var key in freq) {
        if (freq.hasOwnProperty(key)) {
            sortable.push([key, freq[key]]);
        }
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    var tops = [];
    for (var i = 0; i < 3; i++) {
        tops.push(sortable[i][0]);
    }
    return "Top 3 most common tags: " + tops.join(", ");
};
console.log(top3tags(customers, "tags"));


//10. CREATE A SUMMARY OF GENDERS.

var genderSum = _.reduce(customers, function(genders,customer,index){
    if(customer.gender === 'male') {
        genders['male'] = genders.male ? genders.male + 1 : 1;
        return genders;
    }
    else if(customer.gender === 'female') {
        genders['female'] = genders.female ? genders.female + 1 : 1;
        return genders;
    }
    else if(customer.gender === 'transgender') {
        genders['transgender'] = genders.transgender ? genders.transgender + 1 : 1;
        return genders;
    }
}, {});
console.log(genderSum);
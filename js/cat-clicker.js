var model = {
  'init': function () {
    this.cats = [{
      "src": "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"
    }, {
      "src": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496"
    }, {
      "src": "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454"
    }, {
      "src": "https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640"
    }, {
      "src": "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"
    }, {
      "src": "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480"
    }];

    this.cats.map(function(cat, index) {
      cat.name = "cat " + index;
      cat.clickCounter = 0;
    });
  },
  'getCat': function(index) {
    return this.cats[index];
  }
};

var octopus = {
  'init': function() {
    model.init();
    viewCatList.init(model.cats);
    viewCatImg.init();
    viewAdminMode.init();
  },
  'increaseCounter': function (index) {
    model.currentCat.clickCounter++;
    viewCatImg.render();
    viewAdminMode.render();
  },
  'getAllCats': function() {
    return model.cats;
  },
  'getAdminForm': function(index) {
    var selectedCat = model.getCat(index);
    // viewAdminMode.init(selectedCat, index);
  },
  'updateModel': function(currentCat) {
    model.cats.map(function (cat, index) {
      if(model.currentCatIndex == index) {
        cat.name = currentCat.name;
        cat.src = currentCat.src;
        cat.clickCounter = currentCat.clickCounter;
      }
    });
    viewCatList.init(model.cats);
    viewCatImg.render();

    // viewCatImg.init(currentCat, currentCatIndex);
  },
  'setCurrentCat': function(index) {
    model.currentCat = model.cats[index];
    model.currentCatIndex = index;
  },
  getCurrentCat: function() {
      return model.currentCat;
  },
}

var viewCatList = {
  'init': function() {
    this.catListContainer = document.getElementsByTagName("ul")[0];
    viewCatList.render();
  },
  'render': function() {

    var element = document.getElementsByTagName("li"), index;
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

    this.cats = octopus.getAllCats();
    for(i = 0; i < this.cats.length; i++) {
      var node = document.createElement("LI");                 // Create a <li> node
      var textnode = document.createTextNode(this.cats[i].name);         // Create a text node

      node.appendChild(textnode);                              // Append the text to <li>
      this.catListContainer.appendChild(node);

      node.addEventListener('click', (function(index) {
        // select one cat
        return function() {
          octopus.setCurrentCat(index);
          viewCatImg.render();
          viewAdminMode.render();
        };
      })(i));
    }
  }
}

var viewCatImg = {
  'init': function(selectedCat) {
    this.catViewContainer = document.getElementsByTagName('div')[0];
    this.catViewName = document.getElementsByTagName("h1")[0];
    this.catViewImage = document.getElementsByTagName("img")[0];
    this.catViewCounter = document.getElementsByTagName("h3")[0];

    this.catViewImage.addEventListener('click', function () {
      octopus.increaseCounter();
    });
  },
  'render': function() {
    var selectedCat = octopus.getCurrentCat();

    this.catViewName.innerHTML = selectedCat.name;
    this.catViewImage.src = selectedCat.src;
    this.catViewContainer.style.display = "block";
    this.catViewCounter.innerHTML = selectedCat.clickCounter;

    document.getElementById("showAdminForm").addEventListener("click", function() {
      document.getElementsByTagName("form")[0].style.display = "block";
      viewAdminMode.render();
    });
  }
}

var viewAdminMode = {
  'init': function() {
    this.imageName = document.getElementsByName("name")[0];
    this.imageSrc = document.getElementsByName("src")[0];
    this.clickCounter = document.getElementsByName("clickCounter")[0];
    this.form = document.getElementsByTagName("form")[0];

    document.getElementById("cancel").addEventListener("click", function(e) {
      e.preventDefault();
      viewAdminMode.hide();
    });
  },
  'render': function() {
    var selectedCat = octopus.getCurrentCat();
    this.imageName.value = selectedCat.name;
    this.imageSrc.value = selectedCat.src;
    this.clickCounter.value = selectedCat.clickCounter;

    document.getElementById("submit").addEventListener("click", function(e) {
      e.preventDefault();
      var newCurrentCat = {};
      newCurrentCat['name'] = this.form.name.value;
      newCurrentCat['src'] = this.form.src.value;
      newCurrentCat['clickCounter'] = this.form.clickCounter.value;

      octopus.updateModel(newCurrentCat);
    });
  },

  hide: function() {
    this.imageName.value = null;
    this.imageSrc.value = null;
    this.clickCounter.value = null;

    this.form.style.display = "none";
  }
}
octopus.init();

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
  'increaseCounter': function (index) {
    this.cats[index].clickCounter++;
  },
  'getCat': function(index) {
    return this.cats[index];
  }
};

var octopus = {
  'getSelectedCat': function(index) {
      var selectedCat = model.getCat(index);
      viewCatImg.init(selectedCat, index);
  },
  'increaseCounter': function (index) {
    model.increaseCounter(index);
    viewCatImg.init(model.getCat(index), index);
  },
  'init': function() {
    model.init();
    viewCatList.init(model.cats);
  },
  'getAllCats': function() {
    return model.cats;
  },
  'getAdminForm': function(index) {
    var selectedCat = model.getCat(index);
    viewAdminMode.init(selectedCat, index);
  },
  'updateModel': function(currentCat, currentCatIndex) {
    model.cats.map(function (cat, index) {
      if(currentCatIndex == index) {
        cat = currentCat;
      }
    });
    viewCatList.init();
    viewCatImg.init(currentCat, currentCatIndex);
  }
}

var viewCatList = {
  'init': function() {
    this.catListContainer = document.getElementsByTagName("ul")[0];
    viewCatList.render();
  },
  'render': function() {
    this.cats = octopus.getAllCats();
    for(i = 0; i < this.cats.length; i++) {
      var node = document.createElement("LI");                 // Create a <li> node
      var textnode = document.createTextNode(this.cats[i].name);         // Create a text node

      node.appendChild(textnode);                              // Append the text to <li>
      this.catListContainer.appendChild(node);

      node.addEventListener('click', (function(index) {
        // select one cat
        return function() {
          octopus.getSelectedCat(index);
        };
      })(i));
    }
  }
}

var viewCatImg = {
  'init': function(selectedCat, index) {
    this.selectedCat = selectedCat;
    this.selectedCatIndex = index;
    this.catViewContainer = document.getElementsByTagName('div')[0];
    this.catViewName = document.getElementsByTagName("h1")[0];
    this.catViewImage = document.getElementsByTagName("img")[0];
    this.catViewCounter = document.getElementsByTagName("h3")[0];
    viewCatImg.render();
  },
  'render': function() {
    this.catViewName.innerHTML = this.selectedCat.name;
    this.catViewImage.src = this.selectedCat.src;
    this.catViewContainer.style.display = "block";
    this.catViewCounter.innerHTML = this.selectedCat.clickCounter;
    this.catViewImage.addEventListener('click', function (index) {
      var clickedImg = false;
      // increase clicks on cats
      return function() {
        if(!clickedImg) {
            octopus.increaseCounter(index);
        }
        clickedImg = true;
      }
    }(this.selectedCatIndex));

    document.getElementById("showAdminForm").addEventListener("click", function(index, currentCat) {
      octopus.getAdminForm(index);
    }(this.selectedCatIndex));
  }
}

var viewAdminMode = {
  'init': function(selectedCat, index) {
    this.selectedCat = selectedCat;
    this.selectedCatIndex = index;
    this.imageName = document.getElementsByName("name")[0];
    this.imageSrc = document.getElementsByName("src")[0];
    this.clickCounter = document.getElementsByName("clickCounter")[0];
    this.form = document.getElementsByTagName("form")[0];
    this.form.style.display = "block";

    this.form.submit = function(e) {
      e.preventDefault();
      currentCat.name = this.form.name;
      currentCat.src = this.form.imageSrc;
      currentCat.clickCounter = this.form.clickCounter;

      octopus.updateModel(currentCat, currentCatIndex);

    };

    document.getElementById("cancel").addEventListener("click", function() {
      viewAdminMode.destroy();
    });

    viewAdminMode.render();
  },
  'render': function() {
    this.imageName.value = this.selectedCat.name;
    this.imageSrc.value = this.selectedCat.src;
    this.clickCounter = this.selectedCat.clickCounter ? this.selectedCat.clickCounter : '0';
  },
  destroy: function() {

  }
}
octopus.init();

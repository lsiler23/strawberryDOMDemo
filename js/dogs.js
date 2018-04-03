const addToSelect = (array, result) => {
  const newArr = array.concat(result);

  newArr.forEach((el) => {
    let value = `${el}`;
    let lineToAppend = '<li class="master-entry" id=' + `${el}>` + `${el}</li>`
    $l('.dog-master-list').append(lineToAppend)
  });
  return newArr;
};

const populateMasterList = () => {
  const allDogs = [];
  $l.ajax({
    url: 'https://dog.ceo/api/breeds/list',
    success: (result) => addToSelect(allDogs, result.message)
  });
};

const queryPic = (result) => {
  $l('.dog-pic').attr('style', `background-image: url(${result})`);
};

const addFirstPic = () => {
  $l.ajax({
    url: `https://dog.ceo/api/breed/affenpinscher/images/random`,
    success: (result) => queryPic(result.message)
  });
};

const addSwitchPics = (breed) => {
  let url = `https://dog.ceo/api/breed/${breed}/images/random`;

  $l.ajax({
    url,
    success: (result) => queryPic(result.message)
  });
};

const addClickEvent = () => {

  $l('.master-entry').on('click', (e) => {
    $l('li').removeClass('selected');
    let currentId = e.target.id;
    addSwitchPics(currentId);
    $l(`#${currentId}`).addClass('selected');
  });
};

const addRemoveAdoptionEvent = () => {
  $l('.unadopt').on('click', (e) => {
    const currentId = `#${e.target.id}-adopt`;
    const correctRemoval = $l('.adopted-list').find(currentId)
    $l(currentId).remove();
  });
};

const pickMeEvent = () => {
  $l('#picker').on('click', () => {
    const selected = $l('.selected')
    const selectedBreed = selected.nodeList[0].id
    const selectedLi = '<li id=' + `${selectedBreed}-adopt `+ 'class="adoptee">' + `${selectedBreed}` + '</li>'
    const currentId = `#${selectedBreed}-adopt`

    if ($l(currentId).length === 0) {
      $l('.adopted-list').append(selectedLi);
      $l(currentId).append('<button id=' + `${selectedBreed} ` + 'class="unadopt">unadopt</button>');
    }

    addRemoveAdoptionEvent();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  populateMasterList();
  addFirstPic();
  setTimeout(addClickEvent, 3000);
  setTimeout(pickMeEvent, 2000);
});

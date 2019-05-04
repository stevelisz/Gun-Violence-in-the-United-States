function toggleLinks(link){
  if (link.id === "sgl-link"){
    link.classList.add('active');
    document.getElementById("intro-link").classList.remove('active');
  }
  if (link.id == "intro-link"){
    link.classList.add('active');
    document.getElementById("sgl-link").classList.remove('active');
  }
}

angular.module('tutorialSite').service('homeService', function($http){

    var homePageInfo = [
        {
            header: 'Welcome To My Tutorials!',
            content: `Tutorials are a great way to learn!  Seeing how someone else solves a problem
                can many times be the ticket to understanding how certain technologies work.
                Seeing living examples makes it easy to connect the dots and begin to
                understand how the tech works.`
        }, 
        {
            header: 'Where do I start?',
            content: `Right here!  This page is meant as a quick introduction to the different
                    technologies that can be learned on this website. Make sure to tell your
                    friends so they can come learn too!`
        }, 
        {
            header: 'How Much Experience Do I Need?',
            content: `These tutorials are meant to be an easy introduction to the animations
                that can be performed with many different web development languages. A basic 
                understanding of HTML, CSS, and Javascript should be enough to get you 
                started on any of these tutorials!`
        }
    ];


  this.getHomePageIntro = function(){
      return homePageInfo[0];
  };

  this.getMiddleSection = function(){
      return homePageInfo[1];
  }

  this.getBottomSection = function(){
      return homePageInfo[2];
  }

  this.getTechInfo = function(){
      return $http.get('/api/techinfo');
  }


});
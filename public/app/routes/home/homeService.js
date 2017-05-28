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
            content: `These tutorials are meant to be an easy introduction to many different
                languages. A basic understanding of HTML, CSS, and Javascript should
                be enough to get you started on any of these languages.`
        }
    ];

    var techInfo = [
        {
            route: 'angular',
            img: './img/angular.jpeg',
            desc: `AngularJS is a structural 
                framework for dynamic web apps`
        },
        {
            route: 'css',
            img: './img/css.jpeg',
            desc: `"Cascading Style Sheet." Cascading style sheets 
                are used to format the layout of Web pages`
        },
        {
            route: 'greensock',
            img: './img/greensock.png',
            desc: `GreenSock is a suite of JavaScript
                tools for high-performance HTML5 animations`
        },
        {
            route: 'jquery',
            img: './img/jquery.jpeg',
            desc: `jQuery is a fast, small, and 
                feature-rich JavaScript library`
        },
        {
            route: 'javascript',
            img: './img/js.jpeg',
            desc: `JavaScript is a programming language commonly 
                used in web development`
        },
    ]

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
      return techInfo;
  }


});
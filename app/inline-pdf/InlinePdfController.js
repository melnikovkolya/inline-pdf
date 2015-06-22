'use strict';

angular.module('inlinePdf', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

      $routeProvider.when('/inline-pdf', {

        templateUrl: 'inline-pdf/inline-pdf.html',
        controller: 'InlinePdfConrtoller'

      });
    }])

    .controller('InlinePdfConrtoller', [function () {
      console.log("InlinePdfConrtoller");

      var pdfFileLocation = './media/report_20150621_202139_single.pdf',
          currPage = 1,
          numPages = 0,
          canvas,
          thePDF;

      //
      PDFJS.getDocument(pdfFileLocation).then(
          function (pdf) {
            console.log("SUCCESS: PDFJS.getDocument", pdf);

            thePDF = pdf;
            numPages = pdf.numPages;

            pdf.getPage(1).then(handleRemainingPdfPages);

          },
          function (error) {
            console.error("FAIL: PDFJS.getDocument", error);
          });

      //
      function handleRemainingPdfPages(page) {

        var viewport = page.getViewport(1),
            context,
            renderCanvas;

        canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.border = "1px solid black";

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        context = canvas.getContext('2d');

        renderCanvas = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderCanvas);

        renderNextPdfPage();
      }

      //
      function renderNextPdfPage() {
        console.log("renderNextPdfPage");

        document.body.appendChild(canvas);
        currPage++;

        if (thePDF !== null && currPage <= numPages) {

          thePDF.getPage(currPage).then(handleRemainingPdfPages);

        }
      }

    }]);

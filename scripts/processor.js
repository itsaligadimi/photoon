var _URL = window.URL || window.webkitURL;
        var file, img;
        $('input[type=file]').change(function(){
            if ((file = this.files[0])) {
                img = new Image();
                img.src = _URL.createObjectURL(file);
                $('#input_img').attr('src', img.src);
            }
        });


        $("#convert_btn").click(function(){
            $('#output_img').width($('#input_img').width());
            var c = document.getElementById("output_img");
            var ctx = c.getContext("2d");
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            console.debug("width : "+img.width + " and height : " + img.height);
            ctx.drawImage(img, 0, 0);
            var imgData = ctx.getImageData(0, 0, c.width, c.height);
            console.debug(imgData);
            var i;
            for (i = 0; i < imgData.data.length; i += 4) {
                manColor = changeColor(imgData.data[i], imgData.data[i+1], imgData.data[i+2]);
                imgData.data[i] = manColor[0];
                imgData.data[i+1] = manColor[1];
                imgData.data[i+2] = manColor[2];
                imgData.data[i+3] = 255;
            }
            for (i = 0; i < imgData.data.length; i += 4) {
                var pixelIndex = i / 4;
                var col = pixelIndex % img.width;
                var row = (pixelIndex / img.width) + 1;
                var sorData = [
                    imgData.data[i]
                ];
            }     
            ctx.putImageData(imgData, 0, 0);
        });

        function getTopColor(sorData)
        {

        }

        function round(x)
        {
            if(x < 85)
            {
                return 50;
            }
            else if(85 < x && x < 170)
            {
                return 127;
            }
            else 
            {
                return 200;
            }
            // return x > 126 ? 200 : 55;
        }

        function changeColor(r, g, b, log = false)
        {
            // return [round(r), round(g), round(b)]
            var colors = [
                [22, 160, 133],
                [39, 174, 96],
                [41, 128, 185],
                [142, 68, 173],
                [44, 62, 80],
                [243, 156, 18],
                [211, 84, 0],
                [192, 57, 43],
                [189, 195, 199],
                [127, 140, 141]
            ];
            var colors = [
                [63, 81, 192],
                [192, 63, 81],
                [81, 192, 63]
            ];



            // var colors = [
            //     [55, 200, 200],
            //     [55, 200, 55],
            //     [55, 200, 200],
            //     [200, 55, 200],
            //     [55, 55, 55],
            //     [200, 200, 55],
            //     [200, 55, 55],
            //     [200, 55, 55],
            //     [200, 200, 200],
            //     [200, 200, 200]
            // ];

            // var colors = [
            //     [148, 0, 211],
            //     [75, 0, 130],
            //     [0, 0, 255],
            //     [0, 255, 0],
            //     [255, 255, 0],
            //     [255, 127, 0],
            //     [255, 0 , 0]
            // ];
            
            var colors_2d = [
                [256*22+ 160, 133],
                [256*39+ 174, 96],
                [256*41 +128, 185],
                [256*142+ 68, 173],
                [256*44+ 62, 80],
                [256*243+ 156, 18],
                [256*211+ 84, 0],
                [256*192+ 57, 43],
                [256*189+ 195, 199],
                [256*127+ 140, 141]
            ];
            var distance = -10000;
            var selectedColor;
            var i;
            for(i = 0; i < colors.length; i++)
            {
                y = ((r - colors[i][0]) * .299)^2 + ((g - colors[i][1]) * .587)^2 + ((b - colors[i][2]) * .114)^2;
                // y = (r - colors[i][0])^2 + (g - colors[i][1])^2 + (b - colors[i][2])^2;
                
                // y = ((256*r+g) - colors_2d[i][0])^2 + (b - colors_2d[i][1])^2

                if(log) console.debug(y);
                if(y > distance)
                {
                    distance = y;
                    selectedColor = colors[i];
                }
            }

            if(distance != 10000)
            {
                return selectedColor;
            }
            else{
                return [0,0,0];
            }
        }
import app from './app';
import { url } from './config/db';
import { MongoClient } from 'mongodb';
import homeController from './homeController';


MongoClient.connect(url, { useUnifiedTopology: true }, async (e, client) => {
    if (e) return console.error(e);

    const db = client.db("Filma");
    const homeDivs = db.collection('homePage');
    const homeProjects = db.collection('time');

    const sections = homeController(homeDivs);
    const projects = homeController(homeProjects);

    app.get("/home", async (req, res) => {
        try {
            let home = await sections.getHomeDivs();
            let time = await projects.getHomeProjects();
            res.send({home , time});
        } catch (e) {
            next(e);
        }
    });

    app.put("/contact/:id", async (req, res) => {
        let Id = req.params.id;
        let x = {} ; 
        let result = {} ;
       // console.log(req.body);
        console.log( "firstTitle",req.body.firstTitle);

        let firstDivTitle,firstDivSubtitle,firstDivInfo,secondDivTitle,secondDivSubtitle,secondDivInfo; 

        if (req.body.firstTitle) firstDivTitle = req.body.firstTitle;
        if (req.body.firstSubtitle) firstDivSubtitle = req.body.firstSubtitle;
        if (req.body.firstInfo) firstDivInfo = req.body.firstInfo;

        if (req.body.secondTitle) secondDivTitle = req.body.secondTitle;
        if (req.body.secondSubtitle) secondDivSubtitle = req.body.secondSubtitle;
        if (req.body.secondInfo) secondDivInfo = req.body.secondInfo;

        if (firstDivTitle) x.firstDivTitle = firstDivTitle;
        if (firstDivSubtitle) x.firstDivSubtitle = firstDivSubtitle;
        if (firstDivInfo) x.firstDivInfo = firstDivInfo;

        if (secondDivTitle) x.secondDivTitle = secondDivTitle;
        if (secondDivSubtitle) x.secondDivSubtitle = secondDivSubtitle;
        if (secondDivInfo) x.secondDivInfo = secondDivInfo;

        if ( x.hasOwnProperty('firstDivTitle')) result.firstDivTitle = firstDivTitle;
        if ( x.hasOwnProperty('firstDivSubtitle')) result.firstDivSubtitle = firstDivSubtitle;
        if ( x.hasOwnProperty('firstDivInfo')) result.firstDivInfo = firstDivInfo;

        if ( x.hasOwnProperty('secondDivTitle')) result.secondDivTitle = secondDivTitle;
        if ( x.hasOwnProperty('secondDivSubtitle')) result.secondDivSubtitle = secondDivSubtitle;
        if ( x.hasOwnProperty('secondDivInfo')) result.secondDivInfo = secondDivInfo;
        
        //console.log("result" , result);

        let update = await sections.updateHome(Id, result);
        res.send(update);
    });


});


app.listen(8000, () => console.log("server running on port 8000"));
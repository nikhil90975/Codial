const nodeMailer = require('../config/nodemailer');
//const comment = require('../controllers/comment_controller');
exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: 'nikhilranjan90975@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Massage sent',info);
        return;
    });
}
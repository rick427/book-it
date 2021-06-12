module.exports = {
    env: {
        DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
        CLOUDINARY_NAME: 'rick427',
        CLOUDINARY_API_KEY: '971598479377978',
        CLOUDINARY_SECRET_KEY: 'GUo2VKfTDf5Kk_0UQJl9eam47s4',

        SMTP_HOST: 'smtp.mailtrap.io',
        SMTP_PORT: '2525',
        SMTP_USER: 'd048a6f60c95f1',
        SMTP_PASSWORD: 'd60528a427869a',
        SMTP_FROM_NAME: 'BookIt',
        SMTP_FROM_EMAIL: 'noreply@bookit.com'
    },
    images: {
        domains: ['res.cloudinary.com']
    }
}
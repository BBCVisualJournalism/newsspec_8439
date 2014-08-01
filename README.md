# Newsspec-8439

Facewall for the victims of the MH17 flight

## Getting started

Go to NEWSSPEC-8439 and check the description to get the key of the Google Spreadsheet used in config.json.

Set up the project

```
grunt
```

Make images responsive

```
grunt images
```

Build World Service version

```
grunt translate
```

## Making updates to the project

If we get a new photo through, the journalist should go to the spreadsheet and set the `has_picture` property to `yes` for the corresponding passenger. The designer will overlay the new photo over the 'silhouette avatar' in the correct place, then provide you with a new sprite.

You'll need to:

* Name this `sprite.jpg`, overwrite `/source/img/sprite.jpg`.
* Run `grunt make_vocabs` to update the `has_picture` properties.
* Increment the project version number in your package.json
* Increment the cachebust string for the background image sprite in `index.html.tmpl`.
* Delete `/content/`, run `grunt translate`.
* Finally, run `grunt live` and then FTP.

## iFrame scaffold

This project was built using the iFrame scaffold v1.4.4

## License
Copyright (c) 2014 BBC
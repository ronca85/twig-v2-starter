<?php
/**
* Template Name: Contact
*/

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;
Timber::render( array( 'page-contact.twig' ), $context );

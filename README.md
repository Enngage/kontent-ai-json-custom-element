![Last modified][last-commit]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![Stack Overflow][stack-shield]](https://stackoverflow.com/tags/kentico-kontent)
[![GitHub Discussions][discussion-shield]](https://github.com/Kentico/Home/discussions)

<p align="center">
<image src="docs/kontent.webp" alt="kontent logo" width="150" />
</p>

## Description

This custom element for [Kentico Kontent](https://kontent.ai) that represents JSON values & their validation

## Quick Deploy

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Enngage/kontent-ai-json-custom-element)

## Configuration

```json
{
    "sourceElement": "example"
}
```

Where `sourceElement`is the codename of the element where JSON is stored

## What is Saved

The element stores text value of `1` if the JSON is valid, otherwise nothing is stored

## Development

This custom element is built with `Angular`. See package.json for scripts regarding building & publishing the library.

## Contributors

We have collected notes on how to contribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

Originally created by [@Enngage](https://github.com/Enngage)

<a href="https://github.com/Enngage/kontent-ai-json-custom-element/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Enngage/kontent-ai-json-custom-element" />
</a>

## License

[MIT](https://tldrlegal.com/license/mit-license)

## Additional Resources

-   [Custom Element Gallery on github](https://kentico.github.io/kontent-custom-element-samples/gallery/)
-   [Kentico Kontent's Integration documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrations-overview)
-   [Custom Element documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/content-editing-extensions)
-   [Custom Element API reference](https://docs.kontent.ai/reference/custom-elements-js-api)

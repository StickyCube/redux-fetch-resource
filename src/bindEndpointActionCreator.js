import UrlPattern from 'url-pattern';
import FetchResource from './FetchResource.js';

/**
 * Create an action creator for the given endpoint. The endpoint url can contain
 * parameterized fields such as
 *  - /user/:id
 *  - /things/:scope(/:id)
 *
 * All the options which apply to FetchResource can be used with the addition of params
 *
 * @param  {string} url             The edpoint of the resource
 * @param  {options} options        The default options for FetchResource
 * @return {function} actionCreator An action creator for the given endpoint and options
 */
export default function bindEndpointActionCreator (url, options) {
  const pattern = new UrlPattern(url);
  /**
   * An action creator with the bound endpoint. All options to FetchResource can be used along with:
   * @param {object} [option.params={}] A map of params to merge with the endpoint
   */
  const EndpointActionCreator = function (opts = {}) {
    const { params, ...others } = opts;

    return FetchResource(
      pattern.stringify(params),
      {
        ...options,
        ...others
      }
    );
  };

  return EndpointActionCreator;
}

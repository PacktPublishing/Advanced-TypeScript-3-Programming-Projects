/*
 * Copyright(c) 2017 Microsoft Corporation. All rights reserved. 
 * 
 * This code is licensed under the MIT License (MIT). 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software. 
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE. 
*/

/// <reference path="Microsoft.Maps.d.ts"/>
/// <reference path="Modules/GeoJSON.d.ts"/>
/// <reference path="Modules/GeoXml.d.ts"/>

declare module Microsoft.Maps {

    //////////////////////////////////////////////
    /// Interfaces
    //////////////////////////////////////////////

    /** GeoJson options to use when loading a GeoJson file. */
    export interface IGeoJsonReadOptions {
        /** 
         * If the GeoJSON file is hosted on a different domain, and CORS is not enabled, but does support JSONP,
         * you will need to specify the name of JSONP URL parameter that can be used to download the file across different domains.
        */
        jsonpQueryParam?: string,

        /** An optional name to identify the layer by. */
        layerName?: string,

        /** The styles to apply to shapes that don't have a defined style in the XML. */
        style?: IStylesOptions
    }

    /** Steps to execute after a module is loaded. */
    export interface PostModuleAction {
        /** A URL to load the data layer from. Currently supports data in GeoJSON, GeoRSS (with inline GML), GPX, KML, and KMZ formats. */
        addLayerFromUrl: string,

        /** Options to use when loading data via the GeoXml module. */
        geoXmlOption?: IGeoXmlLayerOptions,

        /** Options to use when loading data via the GeoJson module. */
        geoJsonOption?: IGeoJsonReadOptions
    }

    /** Defines which module should be loaded, and the data sets that should be loaded with it. Currently supports the "Microsoft.Maps.GeoXml" and "Microsoft.Maps.GeoJson" modules.*/
    export interface IConfigurableMapModule {
        /** Name of the module to load. Supported values: "Microsoft.Maps.GeoXml", "Microsoft.Maps.GeoJson". */
        moduleName: string,

        /** A set of steps to execute after a module is loaded. */
        moduleOptions: PostModuleAction | PostModuleAction[]
    }

    /**
     * Configurable map definitionm includes initial options to load the map as well as a list of modules to load afterwards.
     */
    export interface IConfigurableMapOptions {
        /** Initial map options. */
        mapOptions: IMapOptions,

        /** List of configuration modules to load. */
        modules: IConfigurableMapModule[]
    }

    //////////////////////////////////////////////
    /// Classes
    //////////////////////////////////////////////
    
    /**
     * The configuration driven map framework. 
     */
    export class ConfigurableMap {

        /**
         * A static function that loads a map using a JSON configuraiton file.
         * @param element The parent element of the map as a CSS selector string or HTMLElement.
         * @param configFileUrl The Url to download the JSON configuration file from. This should JSON file should contain a IConfigurableMapOptions object.
         * @param withCredentials Creates the config file request with the setwithcredentials property.
         * @param requestHeaders Set of headers that need to be added to config file request.
         * @param callback Callback that is triggered when the map loads successfully.
         * @param errorCallback Callback that is triggered when an error occurs when loading the map.
         */
        public static createFromConfig(element: string | HTMLElement, configFileUrl: string, withCredentials: boolean, requestHeaders?: IDictionary<string>, callback?: (map: Map) => void, errorCallback?: (errorMsg: string) => void): void;
    }
}
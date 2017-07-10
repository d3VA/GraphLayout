(function() {
    var t, e = function(t, e) {
        return function() {
            return t.apply(e, arguments);
        };
    };
    (function() {
        function r(r) {
            this.hideTooltip = e(this.hideTooltip, this), this.showTooltip = e(this.showTooltip, this), 
            this.palette = new t(this.clustering_dfield), this.palette.update(0), this.tooltipMain = new Tooltip("tooltip_main", "#container_main", r.TOOLTIP), 
            this.tooltipSearch = new TooltipSearch("tooltip_search", "#controlpanel", r.SEARCH_TOOLTIP);
        }
        r.prototype.VIS_NODES_ID = "#nodes", r.prototype.VIS_LINKS_ID = "#links", r.prototype.clustering_dfield = "artist", 
        r.prototype.sticky_mode = "no_sticky", r.prototype.palette = null, r.prototype.tooltipMain = null, 
        r.prototype.tooltipSearch = null, r.prototype.linkedByIndex = {}, r.prototype.clusters_array = {}, 
        r.prototype.searchTerm = "", r.prototype.updateNodes = function(t) {
            var e, r, o;
            return (o = d3.select(this.VIS_NODES_ID).selectAll("circle.node").data(this.curNodesData, function(t) {
                return t.id;
            })).enter().append("circle").attr("class", "node").attr("cx", function(t) {
                return t.x;
            }).attr("cy", function(t) {
                return t.y;
            }).attr("r", function(t) {
                return t.radius;
            }).style("stroke-width", 1).on("mouseover", this.showTooltip).on("mouseout", this.hideTooltip), 
            o.exit().remove(), o.each(function(t, e) {
                return t.fixed = !1;
            }), o.on("mousedown.drag", null), this.colorNodes(o), "sticky" === this.sticky_mode && (r = t.drag().on("dragstart", function(t) {
                return t.fixed = !0;
            }), o.on("click", null).call(r)), e = clickcancel().on("click", this.nodeClick).on("dblclick", function(t, e) {
                return t.fixed = !1;
            }), o.call(e);
        }, r.prototype.updateLinks = function() {
            var t;
            return (t = d3.select(this.VIS_LINKS_ID).selectAll("line.link").data(this.curLinksData, function(t) {
                return t.source.id + "_" + t.target.id;
            })).enter().append("line").attr("class", "link").attr("stroke", "#ddd").attr("stroke-opacity", .8).attr("stroke-width", "1.5px").attr("fill", "none").attr("x1", function(t) {
                return t.source.x;
            }).attr("y1", function(t) {
                return t.source.y;
            }).attr("x2", function(t) {
                return t.target.x;
            }).attr("y2", function(t) {
                return t.target.y;
            }), t.exit().remove(), t;
        }, r.prototype.removeLinks = function() {
            return d3.select(this.VIS_LINKS_ID).selectAll("line.link").data([]).exit().remove();
        }, r.prototype.removeNodes = function() {
            return d3.select(this.VIS_NODES_ID).selectAll("circle.node").remove();
        }, r.prototype.removeNodesLinks = function() {
            return this.removeNodes(), this.removeLinks(), this.palette.reinitialize();
        }, r.prototype.updatePositions = function() {
            return d3.select(this.VIS_NODES_ID).selectAll("circle.node").attr("cx", function(t) {
                return t.x;
            }).attr("cy", function(t) {
                return t.y;
            }), d3.select(this.VIS_LINKS_ID).selectAll("line.link").attr("x1", function(t) {
                return t.source.x;
            }).attr("y1", function(t) {
                return t.source.y;
            }).attr("x2", function(t) {
                return t.target.x;
            }).attr("y2", function(t) {
                return t.target.y;
            });
        }, r.prototype.updateClustering = function(t) {
            return this.clustering_dfield = t, this.palette.clustering_dfield = this.clustering_dfield, 
            this.palette.reinitialize();
        }, r.prototype.updatePalette = function(t) {
            return this.palette.update(t);
        }, r.prototype.updateColors = function() {
            return this.palette.reinitialize();
        }, r.prototype.getPalette = function() {
            return this.palette.nodePalette;
        }, r.prototype.updateSearch = function(t) {
            var e;
            return this.searchTerm = t, this.tooltipSearch.updateSearch(this.searchTerm), e = d3.select(this.VIS_NODES_ID).selectAll("circle.node"), 
            this.colorNodes(e), d3.select("#tooltip_search").selectAll("a").on("mouseover.customize", function(t) {
                return function(r) {
                    return t.highlightNodeOn(r, e);
                };
            }(this)).on("mouseout.customize", function(t) {
                return function(r) {
                    return t.highlightNodeOff(r, e);
                };
            }(this));
        }, r.prototype.updateSearchMode = function(t) {
            return this.tooltipSearch.search_mode = t, this.updateSearch(this.searchTerm);
        }, r.prototype.showTooltip = function(t) {
            var e, r;
            return this.tooltipMain.show(d3.event, t, this.colorFor(t), this.clusters_array, this.clustering_dfield), 
            (r = d3.select(this.VIS_NODES_ID).selectAll("circle.node")).filter(function(e) {
                return function(r) {
                    return e.neighboring(t, r);
                };
            }(this)).style("stroke", "#555").style("stroke-width", 3), r.filter(function(e) {
                return e === t;
            }).style("stroke", "#000").style("stroke-width", 3), (e = d3.select(this.VIS_LINKS_ID).selectAll("line.link")).filter(function(e) {
                return e.source === t || e.target === t;
            }).attr("stroke", "#555").attr("stroke-opacity", 1), e.filter(function(e) {
                return !(e.source === t || e.target === t);
            }).attr("stroke", "#ddd").attr("stroke-opacity", .5);
        }, r.prototype.hideTooltip = function() {
            var t;
            return this.tooltipMain.hide(), t = d3.select(this.VIS_NODES_ID).selectAll("circle.node"), 
            this.colorNodes(t), d3.select(this.VIS_LINKS_ID).selectAll("line.link").attr("stroke", "#ddd").attr("stroke-opacity", .8);
        }, r.prototype.nodeClick = function(t, e) {
            return window.open(t.full_link, "_blank").focus();
        }, r.prototype.highlightGroup = function(t, e, r) {
            return d3.selectAll(t).on("mouseover.customize", function(t) {
                return function(o, n) {
                    return t.highlightGroupOn(e[n], r);
                };
            }(this)).on("mouseout.customize", function(t) {
                return function(e, r) {
                    return t.highlightGroupOff();
                };
            }(this));
        }, r.prototype.highlightGroupOn = function(t, e) {
            return d3.select(this.VIS_NODES_ID).selectAll("circle.node").filter(function(r) {
                return r[e].toString() === t;
            }).style("stroke-width", 3).style("stroke", "#1858e6");
        }, r.prototype.highlightGroupOff = function() {
            var t;
            return t = d3.select(this.VIS_NODES_ID).selectAll("circle.node"), this.colorNodes(t);
        }, r.prototype.highlightGroupMultiple = function(t, e, r) {
            return d3.selectAll(t).on("mouseover.customize", function(t) {
                return function(o, n) {
                    return t.highlightGroupMultipleOn(e[n], r);
                };
            }(this)).on("mouseout.customize", function(t) {
                return function(e, r) {
                    return t.highlightGroupOff();
                };
            }(this));
        }, r.prototype.highlightGroupMultipleOn = function(t, e) {
            var r, o;
            return o = d3.select(this.VIS_NODES_ID).selectAll("circle.node"), r = "," + t + ",", 
            o.filter(function(t) {
                return ("," + t[e].toString() + ",").indexOf(r) > -1;
            }).style("stroke-width", 3).style("stroke", "#1858e6");
        }, r.prototype.highlightNodeOn = function(t, e) {
            return e.filter(function(e) {
                return e.id === t.id;
            }).style("fill", "#0000FF").attr("r", function(t) {
                return 10;
            });
        }, r.prototype.highlightNodeOff = function(t, e) {
            return e.filter(function(e) {
                return e.id === t.id;
            }).style("fill", "#FF0000").attr("r", function(t) {
                return t.radius;
            });
        }, r.prototype.colorNodes = function(t) {
            return t.style("fill", function(t) {
                return function(e) {
                    return t.colorFor(e);
                };
            }(this)).style("stroke", function(t) {
                return function(e) {
                    return t.strokeFor(e);
                };
            }(this)).style("stroke-width", 1), t.filter(function(t) {
                return t.fixed;
            }).style("stroke-width", 3).style("stroke", "#00bcd4"), t.filter(function(t) {
                return t.searched;
            }).style("fill", "#FF0000").style("stroke-width", 3).style("stroke", "#000");
        }, r.prototype.strokeFor = function(t) {
            return this.palette.strokeFor(t);
        }, r.prototype.colorFor = function(t) {
            return this.palette.colorFor(t);
        }, r.prototype.neighboring = function(t, e) {
            return this.linkedByIndex[t.id + "," + e.id] || this.linkedByIndex[e.id + "," + t.id];
        };
    })(), t = function() {
        function t(t) {
            this.clustering_dfield = t, this.palettes = d3.entries(this.PALETTE_SET).map(function(t) {
                return t.value.palette;
            }), this.createPaletteLegend();
        }
        return t.prototype.PALETTE_SET = {
            0: {
                palette: colorbrewer.Set3[12].concat(colorbrewer.Pastel1[9]),
                name: "Palette 1 - 21 colors"
            },
            1: {
                palette: colorbrewer.Pastel1[9].concat(colorbrewer.Pastel2[8]),
                name: "Palette 2 - 17 colors"
            },
            2: {
                palette: colorbrewer.YlGnBu[9].concat(colorbrewer.Blues[9]),
                name: "Palette 3 - 18 colors"
            },
            3: {
                palette: colorbrewer.Pastel1[9].concat(colorbrewer.Pastel2[8]).concat(colorbrewer.Greens[9]),
                name: "Palette 4 - 26 colors"
            },
            4: {
                palette: colorbrewer.Greys[9].concat(colorbrewer.Greens[9]).concat(colorbrewer.Oranges[9]),
                name: "Palette 5 - 27 colors"
            }
        }, t.prototype.PALETTE_LEGEND_ID = "palette_legend", t.prototype.PALETTE_SELECT_ID = "color_select", 
        t.prototype.clustering_dfield = null, t.prototype.palettes = null, t.prototype.palette = null, 
        t.prototype.nodePalette = null, t.prototype.update = function(t) {
            return null == this.palettes[t] && (t = 0), $("#" + this.PALETTE_SELECT_ID).val() !== t && $("#" + this.PALETTE_SELECT_ID).val(t).change(), 
            this.palette = this.palettes[t], this.reinitialize();
        }, t.prototype.reinitialize = function() {
            return this.nodePalette = d3.scale.ordinal().range(this.palette);
        }, t.prototype.colorFor = function(t) {
            return this.nodePalette(t[this.clustering_dfield]);
        }, t.prototype.strokeFor = function(t) {
            return d3.rgb(this.nodePalette(t[this.clustering_dfield])).darker().toString();
        }, t.prototype.createPaletteLegend = function() {
            var t;
            return t = d3.select("body").append("div").attr("id", this.PALETTE_LEGEND_ID).attr("class", "legend ui-widget-content").style("position", "absolute").style("top", "220px").style("left", "10px").append("div").attr("class", "legend_bar").style("cursor", "move"), 
            $("#" + this.PALETTE_LEGEND_ID).draggable({
                handle: "div.legend_bar"
            }), t.append("p").attr("class", "close").append("span").style("font-size", "20px").html("&times;").on("click", function(t) {
                return function() {
                    return $("#" + t.PALETTE_LEGEND_ID).hide();
                };
            }(this)), t.append("p").style("font-size", "15px").style("font-weight", "bold").text("Color palette:"), 
            (t = d3.select("#" + this.PALETTE_LEGEND_ID).append("div").attr("class", "legend_main")).append("select").attr("id", this.PALETTE_SELECT_ID).attr("width", 170).style("margin-top", "10px"), 
            d3.entries(this.PALETTE_SET).map(function(t) {
                return t.value.name;
            }).forEach(function(t) {
                return function(e, r) {
                    var o;
                    return o = "<option value='" + r + "'>" + e + "</option>", $("#" + t.PALETTE_SELECT_ID).append(o);
                };
            }(this)), $("#" + this.PALETTE_LEGEND_ID).hide();
        }, t;
    }();
}).call(this);
/**
 * Created by: Florin Chelaru
 * Date: 10/3/13
 * Time: 6:01 PM
 */

goog.provide('epiviz.datatypes.GenomicRange');

/**
 * A genomic range to be used within EpiViz for requesting and displaying data.
 * IMPORTANT: Not to be confused with epiviz.datatypes.GenomicRanges.Row (an element
 * of GenomicRanges)
 * @param {string} genome
 * @param {string} seqname
 * @param {number} start
 * @param {number} width
 * @constructor
 * @implements {epiviz.datatypes.Range}
 */
epiviz.datatypes.GenomicRange = function(seqname, start, width, genome) {

  if (width != undefined && width < 0) {
    width = -width;
    if (start != undefined) {
      start -= width;
    }
  }

  /**
   * @type {string}
   * @private
   */
  this._seqname = seqname;

  /**
   * @type {number}
   * @private
   */
  this._start = start;

  /**
   * @type {number}
   * @private
   */
  this._width = width;

  /**
   * @type {string}
   * @private
   */
  this._genome = genome;
};

/**
 * @param {string} seqname
 * @param {number} start
 * @param {number} end
 * @param {string} genome
 * @returns {epiviz.datatypes.GenomicRange}
 */
epiviz.datatypes.GenomicRange.fromStartEnd = function(seqname, start, end, genome) {
  return new epiviz.datatypes.GenomicRange(seqname, start, (start != undefined && end != undefined) ? end - start : undefined, genome);
};

/**
 * @returns {string}
 */
epiviz.datatypes.GenomicRange.prototype.seqName = function() { return this._seqname; };

/**
 * @returns {string}
 */
epiviz.datatypes.GenomicRange.prototype.genome = function() { return this._genome; };

/**
 * @returns {number}
 */
epiviz.datatypes.GenomicRange.prototype.start = function() { return this._start; };

/**
 * @returns {number}
 */
epiviz.datatypes.GenomicRange.prototype.width = function() { return this._width; };

/**
 * @returns {number}
 */
epiviz.datatypes.GenomicRange.prototype.end = function() { return (this._start != undefined && this._width != undefined) ? this._start + this._width : undefined; };

/**
 * @returns {boolean}
 */
epiviz.datatypes.GenomicRange.prototype.isEmpty = function() { return this._width <= 0; };

/**
 * @param {epiviz.datatypes.GenomicRange} other
 * @returns {Array.<epiviz.datatypes.GenomicRange>}
 */
epiviz.datatypes.GenomicRange.prototype.subtract = function(other) {

  // || other.genome() != this._genome
  if (!other || other.seqName() != this._seqname || other.isEmpty()
      || other.start() >= this.end() || this._start >= other.end()) {
    return [this];
  }

  if (other.start() <= this._start && other.end() >= this.end()) {
    return [];
  }

  if (other.start() > this._start && other.end() < this.end()) {
    return [
      epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, this._start, other.start()),
      epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, other.end(), this.end())
    ];
  }

  if (other.start() > this._start) {
    return [epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, this._start, other.start(), this._genome)];
  }

  // other.end() < this.end()
  return [epiviz.datatypes.GenomicRange.fromStartEnd(this._seqname, other.end(), this.end(), this._genome)];
};

/**
 * @param {epiviz.datatypes.GenomicRange} other
 * @returns {boolean}
 */
epiviz.datatypes.GenomicRange.prototype.equals = function(other) {
  if (!other) { return false; }

  if (other == this) { return true; }

  return (this._genome == other._genome && this._seqname == other._seqname && this._start == other._start && this._width == other._width);
};

/**
 * @param {epiviz.datatypes.GenomicRange} other
 * @returns {boolean}
 */
epiviz.datatypes.GenomicRange.prototype.overlapsWith = function(other) {
  if (!other) { return false; }
  if (this == other) { return true; }
  if (this.genome() != other.genome()) { return false; }
  if (this.seqName() != other.seqName()) { return false; }
  return (this.start() < other.end() && this.end() > other.start());
};

/**
 * @returns {{seqName: string, start: number, width: number}}
 */
epiviz.datatypes.GenomicRange.prototype.raw = function() {
  return {
    seqName: this._seqname,
    start: this._start,
    width: this._width,
    genome: this._genome
  };
};

/**
 * @param {{seqName: string, start: number, width: number}} o
 * @returns {epiviz.datatypes.GenomicRange}
 */
epiviz.datatypes.GenomicRange.fromRawObject = function(o) {
  return new epiviz.datatypes.GenomicRange(o.seqName, o.start, o.width, o.genome);
};

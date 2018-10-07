-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-10-07 07:06:32
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `xskjbk`
--

-- --------------------------------------------------------

--
-- 表的结构 `advertisement`
--

CREATE TABLE IF NOT EXISTS `advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL COMMENT '广告所属分类id',
  `aname` varchar(100) NOT NULL COMMENT '广告赞助商',
  `url` varchar(100) NOT NULL COMMENT '广告图地址',
  `create_time` varchar(30) NOT NULL COMMENT '广告创建时间',
  `start_time` varchar(30) NOT NULL COMMENT '广告开始时间',
  `end_time` varchar(30) NOT NULL COMMENT '广告结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `advertisement_category`
--

CREATE TABLE IF NOT EXISTS `advertisement_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(100) NOT NULL COMMENT '广告分类名称',
  `create_time` varchar(30) NOT NULL COMMENT '广告分类创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL COMMENT '文章所属类型id',
  `aid` int(11) NOT NULL COMMENT '文章作者id',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `subtitle` varchar(100) NOT NULL COMMENT '文章副标题',
  `content` text NOT NULL COMMENT '文章内容',
  `advertisement` varchar(100) NOT NULL COMMENT '文章赞助广告',
  `create_time` varchar(30) NOT NULL COMMENT '创建时间',
  `change_time` varchar(30) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `cid`, `aid`, `title`, `subtitle`, `content`, `advertisement`, `create_time`, `change_time`) VALUES
(1, 2, 1, '我的世界叼叼叼', '嘤嘤嘤', '<p>嘤嘤嘤</p><p>我套你猴子阿斯达岁的</p>', '', '1538299992698', '1538300299350'),
(2, 1, 1, '48', 'gjjjjjjjjjjjjjjjjjjjjjj', '<p>gjjjjjjjjjjjjjjjjjjjjjj</p>', '', '1538300755227', '1538300755227');

-- --------------------------------------------------------

--
-- 表的结构 `article_category`
--

CREATE TABLE IF NOT EXISTS `article_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(30) NOT NULL COMMENT '文章分类名称',
  `create_time` varchar(30) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `article_category`
--

INSERT INTO `article_category` (`id`, `cname`, `create_time`) VALUES
(1, '记事本', '1538299963000'),
(2, '阿斯发放', '1536508800000');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL COMMENT '评论所属文章id',
  `uname` varchar(100) NOT NULL COMMENT '评论者名称',
  `content` text NOT NULL COMMENT '评论内容',
  `u_web` varchar(100) NOT NULL COMMENT '评论者个人网站',
  `create_time` varchar(30) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `aid`, `uname`, `content`, `u_web`, `create_time`) VALUES
(1, 1, '小明', '嘤嘤嘤', 'http://www.baidu.com', '1538301013000'),
(2, 1, '嗖嗖嗖', '是', '', '1538301485000'),
(3, 0, '', '', '', ''),
(4, 1, '吕保喜', '我的世界', 'www.baidu.com', '1538308214967'),
(5, 1, '嘤嘤嘤', '我的世界啊', '', '1538308728886');

-- --------------------------------------------------------

--
-- 表的结构 `infor`
--

CREATE TABLE IF NOT EXISTS `infor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iname` varchar(100) NOT NULL COMMENT '评论者名称',
  `content` text NOT NULL COMMENT '评论内容',
  `create_time` varchar(30) NOT NULL COMMENT '创建时间',
  `change_time` varchar(30) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nick` varchar(100) NOT NULL COMMENT '昵称',
  `head_pic` varchar(100) NOT NULL COMMENT '头像',
  `is_admin` int(11) NOT NULL COMMENT '是否为管理员',
  `create_time` varchar(30) NOT NULL COMMENT '注册时间',
  `last_time` varchar(30) NOT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `user_name`, `password`, `nick`, `head_pic`, `is_admin`, `create_time`, `last_time`) VALUES
(1, 'admin', 'admin', '小明', 'user/371538309259000.jpg', 1, '1538309245000', '1538309246000');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
